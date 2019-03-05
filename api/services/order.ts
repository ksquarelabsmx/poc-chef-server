import {
  ordersDataSource,
  eventsDataSource
} from "./../data-source/data-source";

const getOrders = async (): Promise<any> => {
  return Promise.resolve(ordersDataSource.orders);
};

const getOrder = async (orderId: string): Promise<any> => {
  const order = ordersDataSource.orders.find(
    (order: any) => order.id === orderId
  );

  if (order) {
    return Promise.resolve(order);
  }
  return Promise.reject(new Error("That order Id did not match any order"));
};

const getOrdersByEventId = async (eventId: string): Promise<any> => {
  const orders = ordersDataSource.orders.filter(
    (order: any) => order.event.id === eventId
  );

  if (orders.length) {
    return Promise.resolve(orders);
  }
  return Promise.reject(new Error("That event Id did not match any order"));
};

const createOrder = async ({ order }: any): Promise<any> => {
  const event = eventsDataSource.events.find(
    (event: any) => event.id === order.event.id
  );

  if (event) {
    if (!event.finished) {
      return Promise.resolve(ordersDataSource.addOrder(order));
    }
    return Promise.reject(new Error("That event has already finished"));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const updateOrder = async ({ order, id }: any): Promise<any> => {
  const index = ordersDataSource.orders.findIndex(
    (order: any) => order.id === id
  );

  if (index !== -1) {
    return Promise.resolve(ordersDataSource.updateOrder(order, id, index));
  }
  return Promise.reject(new Error("That order Id did not match any event"));
};

const markManyAsPaid = async (
  orderIds: Array<string>
): Promise<Array<string>> => {
  let orderStatus = orderIds.map((orderId: any) => {
    const index = ordersDataSource.orders.findIndex(
      (order: any) => order.id === orderId
    );

    if (index === -1) {
      return `order ${orderId} not found`;
    } else {
      if (ordersDataSource.orders[index].paid) {
        return `order ${orderId} was already marked as paid`;
      } else {
        ordersDataSource.orders[index].paid = true;
        return `order ${orderId} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
};
const markManyAsNotPaid = async (
  orderIds: Array<string>
): Promise<Array<string>> => {
  let orderStatus = orderIds.map((orderId: string) => {
    const index = ordersDataSource.orders.findIndex(
      (order: any) => order.id === orderId
    );

    if (index === -1) {
      return `order ${orderId} not found`;
    } else {
      if (!ordersDataSource.orders[index].paid) {
        return `order ${orderId} has not been marked as paid`;
      } else {
        ordersDataSource.orders[index].paid = false;
        return `order ${orderId} successfully modified`;
      }
    }
  });
  return Promise.resolve(orderStatus);
};

export const orderService = {
  getOrders,
  getOrder,
  getOrdersByEventId,
  createOrder,
  updateOrder,
  markManyAsPaid,
  markManyAsNotPaid
};
