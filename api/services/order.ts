import * as fp from "lodash/fp";
import * as boom from "boom";

import { IOrder, IOrderDetails } from "./../interfaces/order";
import { ordersDataSource, eventsDataSource } from "./../data-source";

const getOrders = async (): Promise<IOrderDetails> => {
  return Promise.resolve(ordersDataSource.find());
};

const getOrderById = async (id: number): Promise<any> => {
  try {
    const order = ordersDataSource.find({ id });

    if (fp.isEmpty(order)) {
      return Promise.resolve(boom.notFound("Not Found"));
    }

    return Promise.resolve(fp.head(order));
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};
/*
const getOrdersByEventId = async (eventId: string): Promise<any> => {
  const orders = ordersDataSource.find()

  if (orders.length) {
    return Promise.resolve(orders);
  }
  return Promise.reject(new Error("That event Id did not match any order"));
};*/

const createOrder = async (order: IOrder): Promise<any> => {
  try {
    const eventFinded = eventsDataSource.find({ id: order.eventId });
    //TODO: format error
    if (fp.isEmpty(eventFinded)) {
      return Promise.reject(boom.badRequest("Not Found"));
    }
    if (eventFinded.finished) {
      return Promise.reject(boom.badRequest("Event has already finished"));
    }

    const createdOrder = ordersDataSource.save(order);
    return Promise.resolve(createdOrder);
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

const updateOrder = async (order: IOrder): Promise<any> => {
  try {
    const { id } = order;
    const orderFinded = ordersDataSource.find({ id });

    if (fp.isEmpty(orderFinded)) {
      return Promise.reject(boom.badRequest("Not Found"));
    }
    if (orderFinded.cancelled) {
      return Promise.reject(boom.badRequest("Order has already cancelled"));
    }
    if (orderFinded.paid) {
      return Promise.reject(boom.badRequest("Order has already paid"));
    }

    return Promise.resolve(ordersDataSource.update(order));
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

const markManyAsPaid = async (orderIds: string[]): Promise<string[]> => {
  try {
    const orderStatus = orderIds.map((id: string) => {
      const order = ordersDataSource.find({ id });
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
    return Promise.reject(new Error(err));
  }
};

const markManyAsNotPaid = async (orderIds: string[]): Promise<string[]> => {
  try {
    const orderStatus = orderIds.map((id: any) => {
      const order = ordersDataSource.find({ id });
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
    return Promise.reject(new Error(err));
  }
};

export const orderService = {
  getOrders,
  getOrderById,
  //getOrdersByEventId,
  createOrder,
  updateOrder,
  markManyAsPaid,
  markManyAsNotPaid
};
