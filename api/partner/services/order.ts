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

  const markAsPaid = async (id: string): Promise<IOrder> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
      }
      if (order.cancelled) {
        throw Promise.reject(response.badRequest(error.orderIsCancelled));
      }
      if (order.paid) {
        throw Promise.reject(response.badRequest(error.orderIsPaid));
      }

      order.paid = true;
      return Promise.resolve(ordersDataSource.update(order));
    } catch (err) {
      return err;
    }
  };

  const markAsNotPaid = async (id: string): Promise<IOrder> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });
      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
      }
      if (order.cancelled) {
        throw Promise.reject(response.badRequest(error.orderIsCancelled));
      }
      if (!order.paid) {
        throw Promise.reject(response.badRequest(error.orderIsNotPaid));
      }

      order.paid = false;
      return Promise.resolve(ordersDataSource.update(order));
    } catch (err) {
      return err;
    }
  };

  const markAsCancel = async (id: string): Promise<IOrder> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
      }
      if (order.paid) {
        throw Promise.reject(response.badRequest(error.orderIsPaid));
      }
      if (order.cancelled) {
        throw Promise.reject(response.badRequest(error.orderIsCancelled));
      }

      order.cancelled = true;
      return ordersDataSource.update(order);
    } catch (err) {
      return err;
    }
  };

  const markAsNotCancel = async (id: string): Promise<IOrder> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
      }
      if (order.paid) {
        throw Promise.reject(response.badRequest(error.orderIsPaid));
      }
      if (!order.cancelled) {
        throw Promise.reject(response.badRequest(error.orderIsNotCancelled));
      }

      order.cancelled = false;
      return ordersDataSource.update(order);
    } catch (err) {
      return err;
    }
  };

  return {
    getOrders,
    getOrderById,
    markAsPaid,
    markAsNotPaid,
    markAsCancel,
    markAsNotCancel
  };
};
