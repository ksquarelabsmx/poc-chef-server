import * as fp from "lodash/fp";
import * as boom from "boom";
import * as moment from "moment";

import { error, response } from "../../common/utils";
import { IOrder } from "api/common/models/order";
import { IEvent } from "api/common/models/event";
import { IProduct } from "api/common/models/product";
import { IOrderProduct } from "api/common/models/order-product";
import { IOrderRepository } from "api/common/repositories/order-repository";
import { IEventRepository } from "api/common/repositories/event-repository";
import { IProductRepository } from "api/common/repositories/product-repository";

const normalizeProducts = (
  records,
  products: IOrderProduct[]
): IOrderProduct[] => {
  return records
    .map((docs: IProduct[]) => docs[0])
    .filter((prod: IProduct) => prod)
    .map((prod: IProduct) => {
      const rawProduct: IOrderProduct = products.filter(
        rawProd => rawProd.id === prod.id
      )[0];
      return {
        ...rawProduct,
        subtotal: rawProduct.quantity * rawProduct.price
      };
    });
};

const calculateTotal = (products: IOrderProduct[]) => {
  return products.reduce((acc: number, product: IOrderProduct) => {
    return acc + product.quantity * product.price;
  }, 0);
};

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
  productRepository: IProductRepository,
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

  const createOne = async (data: IOrder): Promise<any> => {
    try {
      const [eventFinded]: IEvent[] = await eventsDataSource.find({
        id: data.eventId
      });

      if (fp.isEmpty(eventFinded)) {
        return Promise.reject(response.badRequest(error.eventNotExist));
      }
      if (isFinished(eventFinded)) {
        return Promise.reject(response.badRequest(error.eventIsFinished));
      }

      const records = await Promise.all(
        data.products.map(
          async (product: IOrderProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const products = normalizeProducts(records, data.products);
      if (products.length !== data.products.length) {
        return Promise.reject(boom.notFound("Product Not Found"));
      }

      return Promise.resolve(
        ordersDataSource.save({
          ...data,
          products: products,
          total: calculateTotal(products)
        })
      );
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const updateOneById = async (id: string, order: any): Promise<any> => {
    try {
      const [oldOrder]: IOrder[] = await ordersDataSource.find({ id });
      const [eventFinded]: IEvent[] = await eventsDataSource.find({
        id: order.eventId
      });

      if (fp.isEmpty(eventFinded)) {
        return Promise.reject(response.badRequest(error.eventNotExist));
      }
      if (isFinished(eventFinded)) {
        return Promise.reject(response.badRequest(error.eventIsFinished));
      }
      if (fp.isEmpty(oldOrder)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      //validate if the request order.eventId is the same as the existing order.eventId
      if (oldOrder.eventId !== order.eventId) {
        return Promise.reject(response.badRequest(error.orderEventDifferent));
      }
      if (oldOrder.cancelled) {
        return Promise.reject(response.badRequest(error.orderIsCancelled));
      }
      if (oldOrder.paid) {
        return Promise.reject(response.badRequest(error.orderIsPaid));
      }

      const records = await Promise.all(
        order.products.map(
          async (product: IOrderProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const products = normalizeProducts(records, order.products);
      if (products.length !== order.products.length) {
        return Promise.reject(boom.notFound("Product Not Found"));
      }

      return Promise.resolve(
        ordersDataSource.update({
          ...order,
          products: products,
          total: calculateTotal(products)
        })
      );
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
    createOne,
    updateOneById,
    markManyAsPaid,
    markManyAsNotPaid,
    markManyAsCancelled,
    markManyAsNotCancelled
  };
};
