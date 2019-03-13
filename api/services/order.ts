import { IOrder } from "./../interfaces/order";
import { ordersDataSource, eventsDataSource } from "./../data-source";

const getOrders = async (): Promise<any> => {
  return Promise.resolve(ordersDataSource.find());
};

const getOrderById = async (id: string): Promise<any> => {
  const order = ordersDataSource.find({ id });

  if (order) {
    return Promise.resolve(order);
  }
  return Promise.reject(new Error("That order Id did not match any order"));
};
/*
const getOrdersByEventId = async (eventId: string): Promise<any> => {
  const orders = ordersDataSource.find()

  if (orders.length) {
    return Promise.resolve(orders);
  }
  return Promise.reject(new Error("That event Id did not match any order"));
};*/

const createOrder = async (order: IOrder): Promise<IOrder> => {
  const event = eventsDataSource.find({ id: order.event.id });

  if (event) {
    if (!event.finished) {
      return Promise.resolve(ordersDataSource.save(order));
    }
    return Promise.reject(new Error("That event has already finished"));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const updateOrder = async (order: IOrder): Promise<IOrder> => {
  const { id } = order;
  const index = ordersDataSource.find({ id });

  if (index) {
    return Promise.resolve(ordersDataSource.update(order));
  }
  return Promise.reject(new Error("That order Id did not match any event"));
};

const markManyAsPaid = async (orderIds: string[]): Promise<string[]> => {
  const orderStatus = orderIds.map((id: string) => {
    const order: IOrder = ordersDataSource.find({ id })[0];
    if (order === undefined) {
      return `order ${id} not found`;
    } else {
      if (order.paid) {
        return `order ${id} was already marked as paid`;
      } else {
        order.paid = true;
        ordersDataSource.update(order);
        return `order ${id} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
};

const markManyAsNotPaid = async (orderIds: string[]): Promise<string[]> => {
  const orderStatus = orderIds.map((id: any) => {
    const order: IOrder = ordersDataSource.find({ id })[0];
    if (order === undefined) {
      return `order ${id} not found`;
    } else {
      if (!order.paid) {
        return `order ${id} has not been marked as paid`;
      } else {
        order.paid = false;
        ordersDataSource.update(order);
        return `order ${id} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
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
