import * as fp from "lodash/fp";
import * as boom from "boom";

import { error, response } from "../utils";
import { order, event } from "../interfaces";
import { ordersDataSource, eventsDataSource } from "../data-source";

const getOrders = async (): Promise<order.IOrderDetails[]> => {
  return Promise.resolve(ordersDataSource.find());
};

const getOrderById = async (id: number): Promise<any> => {
  try {
    const order = ordersDataSource.find({ id });

    if (fp.isEmpty(order)) {
      return Promise.reject(boom.notFound("Not Found"));
    }

    return Promise.resolve(fp.head(order));
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const createOrder = async (order: order.IOrder): Promise<any> => {
  try {
    const eventFinded: event.IEventDetails[] = eventsDataSource.find({
      id: order.eventId
    });

    if (fp.isEmpty(eventFinded)) {
      return Promise.reject(response.badRequest(error.eventNotExist));
    }
    if (eventFinded[0].finished) {
      return Promise.reject(response.badRequest(error.eventIsFinished));
    }

    const createdOrder = ordersDataSource.save(order);
    return Promise.resolve(createdOrder);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const updateOrder = async (order: order.IOrder): Promise<any> => {
  try {
    const { id } = order;
    const orderFinded = ordersDataSource.find({ id });

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
    const orderStatus = orderIds.map((id: string) => {
      const order: order.IOrderDetails[] = ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        return `order ${id} not found`;
      }
      if (order[0].paid) {
        return `order ${id} was already marked as paid`;
      }

      order[0].paid = true;
      ordersDataSource.update(order);
      return `order ${id} successfully modified`;
    });
    return Promise.resolve(orderStatus);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const markManyAsNotPaid = async (orderIds: string[]): Promise<string[]> => {
  try {
    const orderStatus: string[] = orderIds.map((id: any) => {
      const order: order.IOrderDetails[] = ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        return `order ${id} not found`;
      }
      if (!order[0].paid) {
        return `order ${id} has not been marked as paid`;
      }
      order[0].paid = false;
      ordersDataSource.update(order);
      return `order ${id} successfully modified`;
    });
    return Promise.resolve(orderStatus);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

export const orderRepository = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  markManyAsPaid,
  markManyAsNotPaid
};
