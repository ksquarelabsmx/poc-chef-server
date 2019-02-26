import { ordersMock, eventsMock } from "./../data-source/data-source";

const getOrders = async (): Promise<any> => {
  return Promise.resolve(ordersMock.orders);
};

const getOrder = async ({ orderId }: any): Promise<any> => {
  return Promise.resolve(ordersMock.orders[0]);
};

const createOrder = async ({ order }: any): Promise<any> => {
  const event = eventsMock.events.find(event => event.id === order.event.id);

  if (event) {
    if (!event.finished) {
      return Promise.resolve(ordersMock.addOrder(order));
    }
    return Promise.reject(new Error("That event has already finished"));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const markManyAsPaid = (orderIds: Array<string>): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    const initialAmount: number = orderIds.length;
    const orders: any = [...ordersMock.orders];

    let currentAmount: number = initialAmount;
    let paidStatus: Array<string> = [];

    // TODO
    /* change forEach by reduce, so we avoid to declare variables with let.
      reduce return 
        ordersStatus {
          currentAmount: number,
          paidStatus: Array<String>
        }
    */
    orderIds.forEach(orderId => {
      const orderIndex = orders.findIndex((order: any) => {
        return order.id === orderId;
      });

      if (orderIndex === -1) {
        paidStatus.push(`order ${orderId} not found`);
        currentAmount--;
      } else {
        if (orders[orderIndex].paid === true) {
          currentAmount--;
          paidStatus.push(`order ${orderId} was already marked as paid`);
        } else {
          orders[orderIndex].paid = true;
          paidStatus.push(`order ${orderId} successfully modified`);
        }
      }
    });

    if (!currentAmount)
      return reject(
        new Error(
          "Those orders do not exists or they are already marked as paid"
        )
      );

    ordersMock.orders = orders;

    return resolve(paidStatus);
  });
};

export const orderService = {
  getOrders,
  getOrder,
  createOrder,
  markManyAsPaid
};
