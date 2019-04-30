import * as fp from "lodash/fp";
import * as boom from "boom";

import { IOrder } from "api/common/models/order";
import { IOrderRepository } from "api/common/repositories/order-repository";

export const OrderService = (ordersDataSource: IOrderRepository) => {
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

  return {
    getOrders,
    getOrderById,
    markManyAsPaid,
    markManyAsNotPaid
  };
};
