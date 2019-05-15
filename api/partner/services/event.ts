import * as fp from "lodash/fp";
import * as boom from "boom";
import * as moment from "moment";

import { error, response } from "../../common/utils";
import { IEvent } from "../../common/models/event";
import { IOrder } from "./../../common/models/order";
import { IProduct } from "../../common/models/product";
import { IEventRepository } from "../../common/repositories/event-repository";
import { IOrderRepository } from "api/common/repositories/order-repository";
import { IProductRepository } from "./../../common/repositories/product-repository";

const isFinishedCancelled = (event: IEvent): boolean => {
  return (
    event.cancelled ||
    event.expirationDateTime <
      moment()
        .utc()
        .unix()
  );
};

const isFinished = (event: IEvent): boolean => {
  return (
    event.expirationDateTime <
    moment()
      .utc()
      .unix()
  );
};

const normalizeProducts = (records: IProduct[][]): IProduct[] => {
  return records
    .map((docs: IProduct[]) => docs[0])
    .filter((prod: IProduct) => prod);
};

export const EventService = (
  eventsDataSource: IEventRepository,
  ordersDataSource: IOrderRepository,
  productMemoryRepository: IProductRepository
) => {
  const getEvents = async (): Promise<IEvent[]> => {
    return eventsDataSource.find();
  };

  const getCurrentEvents = async (): Promise<IEvent[]> => {
    try {
      const events: IEvent[] = await eventsDataSource.find();
      const currentEvents: IEvent[] = events.filter(
        (event: IEvent) => !isFinishedCancelled(event)
      );
      return Promise.resolve(currentEvents);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const getPastEvents = async (): Promise<IEvent[]> => {
    try {
      const events: IEvent[] = await eventsDataSource.find();
      const pastEvents: IEvent[] = events.filter((event: IEvent) =>
        isFinishedCancelled(event)
      );
      return Promise.resolve(pastEvents);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const getEventOrderById = async (id: string): Promise<IEvent> => {
    try {
      const [event]: IEvent[] = await eventsDataSource.find({ id });
      if (fp.isEmpty(event)) {
        throw Promise.reject(boom.notFound("Event Not Found"));
      }
      const orders: IOrder[] = await ordersDataSource.find({
        eventId: id
      });
      const eventOrders: IEvent = { ...event, orders: orders };

      return Promise.resolve(eventOrders);
    } catch (err) {
      return err;
    }
  };

  const createEvent = async (data: IEvent): Promise<IEvent> => {
    try {
      const records: IProduct[][] = await Promise.all(
        data.products.map(
          async (product: IProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productMemoryRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const products: IProduct[] = normalizeProducts(records);
      if (products.length !== data.products.length) {
        throw Promise.reject(boom.notFound("Product Not Found"));
      }
      return Promise.resolve(eventsDataSource.save(data));
    } catch (err) {
      return err;
    }
  };

  const updateEvent = async (data: IEvent): Promise<IEvent> => {
    try {
      const { id } = data;
      const [eventFinded]: IEvent[] = await eventsDataSource.find({ id });

      if (fp.isEmpty(eventFinded)) {
        throw Promise.reject(boom.notFound("Event Not Found"));
      }
      if (isFinished(eventFinded)) {
        throw Promise.reject(response.badRequest(error.eventIsFinished));
      }
      if (eventFinded.cancelled) {
        throw Promise.reject(response.badRequest(error.eventIsCancelled));
      }
      const records: IProduct[][] = await Promise.all(
        data.products.map(
          async (product: IProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productMemoryRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const products: IProduct[] = normalizeProducts(records);
      if (products.length !== data.products.length) {
        throw Promise.reject(boom.notFound("Product Not Found"));
      }
      return eventsDataSource.update(data);
    } catch (err) {
      return err;
    }
  };

  const markAsCancelled = async (id: string): Promise<IEvent> => {
    try {
      const [event]: IEvent[] = await eventsDataSource.find({ id });
      if (fp.isEmpty(event)) {
        throw Promise.reject(boom.notFound("Event Not Found"));
      }
      if (isFinished(event)) {
        throw Promise.reject(response.badRequest(error.eventIsFinished));
      }
      if (event.cancelled) {
        throw Promise.reject(response.badRequest(error.eventIsCancelled));
      }

      event.cancelled = true;
      return Promise.resolve(eventsDataSource.update(event));
    } catch (err) {
      return err;
    }
  };

  const markAsNotCancelled = async (id: string): Promise<IEvent> => {
    try {
      const [event]: IEvent[] = await eventsDataSource.find({ id });
      if (fp.isEmpty(event)) {
        throw Promise.reject(boom.notFound("Event Not Found"));
      }
      if (isFinished(event)) {
        throw Promise.reject(response.badRequest(error.eventIsFinished));
      }
      if (!event.cancelled) {
        throw Promise.reject(response.badRequest(error.eventIsNotCancelled));
      }

      event.cancelled = false;
      return Promise.resolve(eventsDataSource.update(event));
    } catch (err) {
      return err;
    }
  };

  return {
    getEvents,
    getEventOrderById,
    getPastEvents,
    getCurrentEvents,
    createEvent,
    updateEvent,
    markAsCancelled,
    markAsNotCancelled
  };
};
