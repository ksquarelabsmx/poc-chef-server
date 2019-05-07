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

const isFinished = (event: IEvent): boolean => {
  return (
    event.markedAsFinished ||
    event.expirationDate <
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

  const getCurrentEvents = async (): Promise<any> => {
    try {
      const events: IEvent[] = await eventsDataSource.find({
        markedAsFinished: false
      });

      return Promise.resolve(events);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const getPastEvents = async (): Promise<any> => {
    try {
      const events: IEvent[] = await eventsDataSource.find({
        markedAsFinished: true
      });

      return Promise.resolve(events);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const getEventOrderById = async (id: string): Promise<any> => {
    try {
      const event: IEvent[] = await eventsDataSource.find({ id });

      if (fp.isEmpty(event)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      const orders: IOrder[] = await ordersDataSource.find({
        eventId: id
      });
      const eventOrders: IEvent = { ...event[0], orders: orders };

      return Promise.resolve(eventOrders);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const createEvent = async (data: IEvent): Promise<any> => {
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
        return Promise.reject(boom.notFound("Product Not Found"));
      }
      return Promise.resolve(eventsDataSource.save(data));
    } catch (err) {
      return Promise.resolve(boom.internal("Internal Server Error"));
    }
  };

  const updateEvent = async (data: IEvent): Promise<any> => {
    try {
      const { id } = data;
      const eventFinded: IEvent[] = await eventsDataSource.find({ id });

      if (fp.isEmpty(eventFinded)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      if (isFinished(eventFinded[0])) {
        return Promise.reject(response.badRequest(error.eventIsFinished));
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
        return Promise.reject(boom.notFound("Product Not Found"));
      }
      return eventsDataSource.update(data);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsFinished = async (eventIds: string[]): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(
          async (id: string): Promise<string> => {
            const [event]: IEvent[] = await eventsDataSource.find({ id });

            if (fp.isEmpty(event)) {
              return Promise.resolve(`event ${id} not found`);
            }
            if (event.markedAsFinished) {
              return Promise.resolve(
                `event ${id} was already marked as finished`
              );
            }
            event.markedAsFinished = true;
            eventsDataSource.update(event);
            return Promise.resolve(`event ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotFinished = async (
    eventIds: string[]
  ): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(async (id: any) => {
          const [event]: IEvent[] = await eventsDataSource.find({ id });

          if (fp.isEmpty(event)) {
            return Promise.resolve(`event ${id} not found`);
          }
          if (!event.markedAsFinished) {
            return Promise.resolve(
              `event ${id} has not been marked as finished`
            );
          }
          event.markedAsFinished = false;
          eventsDataSource.update(event);
          return Promise.resolve(`event ${id} successfully modified`);
        })
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsCancelled = async (eventIds: string[]): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(
          async (id: string): Promise<string> => {
            const [event]: IEvent[] = await eventsDataSource.find({ id });

            if (fp.isEmpty(event)) {
              return Promise.resolve(`event ${id} not found`);
            }
            if (event.cancelled) {
              return Promise.resolve(
                `event ${id} was already marked as cancelled`
              );
            }
            event.cancelled = true;
            eventsDataSource.update(event);
            return Promise.resolve(`event ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotCancelled = async (
    eventIds: string[]
  ): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(async (id: any) => {
          const [event]: IEvent[] = await eventsDataSource.find({ id });

          if (fp.isEmpty(event)) {
            return Promise.resolve(`event ${id} not found`);
          }
          if (!event.cancelled) {
            return Promise.resolve(
              `event ${id} has not been marked as cancelled`
            );
          }
          event.cancelled = false;
          eventsDataSource.update(event);
          return Promise.resolve(`event ${id} successfully modified`);
        })
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getEvents,
    getEventOrderById,
    getPastEvents,
    getCurrentEvents,
    createEvent,
    updateEvent,
    markManyAsFinished,
    markManyAsNotFinished,
    markManyAsCancelled,
    markManyAsNotCancelled
  };
};
