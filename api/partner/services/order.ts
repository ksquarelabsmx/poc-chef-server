import * as fp from "lodash/fp";
import * as boom from "boom";

import { error, response } from "../../common/utils";
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
        return Promise.reject(boom.notFound("Order Not Found"));
      }

      return Promise.resolve(fp.head(order));
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markAsPaid = async (id: string): Promise<string> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        return Promise.reject(boom.notFound("Order Not Found"));
      }
      if (order.paid) {
        return Promise.reject(response.badRequest(error.orderIsPaid));
      }

      order.paid = true;
      ordersDataSource.update(order);
      return Promise.resolve(`order ${id} successfully modified`);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markAsNotPaid = async (id: string): Promise<string> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        return Promise.reject(boom.notFound("Order Not Found"));
      }
      if (!order.paid) {
        return Promise.reject(response.badRequest(error.orderIsNotPaid));
      }

      order.paid = false;
      ordersDataSource.update(order);
      return Promise.resolve(`order ${id} successfully modified`);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getOrders,
    getOrderById,
    markAsPaid,
    markAsNotPaid
  };
};
