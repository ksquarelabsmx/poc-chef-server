import * as fp from "lodash/fp";
import * as boom from "boom";
import * as moment from "moment";

import { error, response } from "../utils";
import { IOrder } from "../../common/models/order";
import { IEvent } from "../../common/models/event";
import { IOrderRepository } from "../../common/repositories/order-repository";
import { IEventRepository } from "api/common/repositories/event-repository";

const isFinished = (event: IEvent): boolean => {
  return (
    event.markedAsFinished ||
    event.expirationDate <
      moment()
        .utc()
        .unix()
  );
};

export const OrderService = (
  ordersDataSource: IOrderRepository,
  eventsDataSource: IEventRepository
) => {
  const getOrders = async (): Promise<IOrder[]> => {
    return Promise.resolve(ordersDataSource.find());
  };

  const getOrderById = async (id: string): Promise<any> => {
    try {
      const order: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        return Promise.reject(boom.notFound("Not Found"));
      }

      return Promise.resolve(fp.head(order));
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const createOrder = async (order: IOrder): Promise<any> => {
    try {
      const eventFinded = await eventsDataSource.find({
        id: order.eventId
      });

      if (fp.isEmpty(eventFinded)) {
        return Promise.reject(response.badRequest(error.eventNotExist));
      }
      if (isFinished(eventFinded[0])) {
        return Promise.reject(response.badRequest(error.eventIsFinished));
      }

      return ordersDataSource.save(order);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const updateOrder = async (order: IOrder): Promise<any> => {
    try {
      const { id } = order;
      const orderFinded = await ordersDataSource.find({ id });

      if (fp.isEmpty(orderFinded)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      //validate if the request order.eventId is the same as the existing order.eventId
      if (orderFinded[0].eventId !== order.eventId) {
        return Promise.reject(response.badRequest(error.orderEventDifferent));
      }
      if (orderFinded[0].cancelled) {
        return Promise.reject(response.badRequest(error.orderIsCancelled));
      }
      if (orderFinded[0].paid) {
        return Promise.reject(response.badRequest(error.orderIsPaid));
      }

      return Promise.resolve(ordersDataSource.update(order));
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsPaid = async (orderIds: string[]): Promise<string[]> => {
    try {
      const orderStatus = await Promise.all(
        orderIds.map(
          async (id: string): Promise<string> => {
            const [order]: IOrder[] = await ordersDataSource.find({ id });

            if (fp.isEmpty(order)) {
              return Promise.resolve(`order ${id} not found`);
            }

            if (order.paid) {
              return Promise.resolve(`order ${id} was already marked as paid`);
            }
            order.paid = true;
            ordersDataSource.update(order);
            return Promise.resolve(`order ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(orderStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotPaid = async (orderIds: string[]): Promise<string[]> => {
    try {
      const orderStatus = await Promise.all(
        orderIds.map(async (id: any) => {
          const [order]: IOrder[] = await ordersDataSource.find({ id });

          if (fp.isEmpty(order)) {
            return Promise.resolve(`order ${id} not found`);
          }
          if (!order.paid) {
            return Promise.resolve(`order ${id} has not been marked as paid`);
          }
          order.paid = false;
          ordersDataSource.update(order);
          return Promise.resolve(`order ${id} successfully modified`);
        })
      );
      return Promise.resolve(orderStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsCancelled = async (orderIds: string[]): Promise<string[]> => {
    try {
      const orderStatus = await Promise.all(
        orderIds.map(
          async (id: string): Promise<string> => {
            const [order]: IOrder[] = await ordersDataSource.find({ id });

            if (fp.isEmpty(order)) {
              return Promise.resolve(`order ${id} not found`);
            }
            if (order.cancelled) {
              return Promise.resolve(
                `order ${id} was already marked as cancelled`
              );
            }
            order.cancelled = true;
            ordersDataSource.update(order);
            return Promise.resolve(`order ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(orderStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotCancelled = async (
    orderIds: string[]
  ): Promise<string[]> => {
    try {
      const orderStatus = await Promise.all(
        orderIds.map(async (id: any) => {
          const [order]: IOrder[] = await ordersDataSource.find({ id });

          if (fp.isEmpty(order)) {
            return Promise.resolve(`order ${id} not found`);
          }
          if (!order.cancelled) {
            return Promise.resolve(
              `order ${id} has not been marked as cancelled`
            );
          }
          order.cancelled = false;
          ordersDataSource.update(order);
          return Promise.resolve(`order ${id} successfully modified`);
        })
      );
      return Promise.resolve(orderStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    markManyAsPaid,
    markManyAsNotPaid,
    markManyAsCancelled,
    markManyAsNotCancelled
  };
};
