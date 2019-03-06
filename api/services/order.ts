import { IOrder } from "./../interfaces/order"
import { ordersDataSource, eventsDataSource } from "./../data-source";

const getOrders = async (): Promise<any> => {
  return Promise.resolve(ordersDataSource.find());
};

const getOrder = async (orderId: string): Promise<any> => {
  const order = ordersDataSource.find({ id: orderId });

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

const createOrder = async (order: IOrder): Promise<any> => {
  const event = eventsDataSource.find({ id: order.event.id });

  if (event) {
    if (!event.finished) {
      return Promise.resolve(ordersDataSource.save(order));
    }
    return Promise.reject(new Error("That event has already finished"));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const updateOrder = async (order: IOrder): Promise<any> => {
  const { id } = order
  const index = ordersDataSource.find({ id });

  if (index) {
    return Promise.resolve(ordersDataSource.update(order));
  }
  return Promise.reject(new Error("That order Id did not match any event"));
};

const markManyAsPaid = async (
  orderIds: Array<string>
): Promise<Array<string>> => {
  const orderStatus = orderIds.map((orderId: any) => {
    const order = ordersDataSource.find({id: orderId});
    if (order) {
      return `order ${orderId} not found`;
    } else {
      if (order.paid) {
        return `order ${orderId} was already marked as paid`;
      } else {
        order.paid = true;
        ordersDataSource.update(order);
        return `order ${orderId} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
};

const markManyAsNotPaid = async (
  orderIds: Array<string>
): Promise<Array<string>> => {
  const orderStatus = orderIds.map((orderId: any) => {
    const order = ordersDataSource.find({id: orderId});
    if (order) {
      return `order ${orderId} not found`;
    } else {
      if (order.paid) {
        return `order ${orderId} has not been marked as paid`;
      } else {
        order.paid = true;
        ordersDataSource.update(order);
        return `order ${orderId} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
};

export const orderService = {
  getOrders,
  getOrder,
  //getOrdersByEventId,
  createOrder,
  updateOrder,
  markManyAsPaid,
  markManyAsNotPaid
};
