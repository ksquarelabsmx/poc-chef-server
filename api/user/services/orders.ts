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

const normalizeProducts = (records, products) => {
  return records
    .map(docs => docs[0])
    .filter(prod => prod)
    .map(prod => {
      const rawProduct = products.filter(rawProd => rawProd.id === prod.id)[0];
      return {
        ...prod,
        quantity: rawProduct.quantity
      };
    });
};

const calculateTotal = products => {
  return products.reduce((acc, product) => {
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
  const getAll = async (): Promise<IOrder[]> => {
    return Promise.resolve(ordersDataSource.find());
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
        return Promise.reject(boom.notFound("Not Found"));
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
          async (product: any): Promise<any> => {
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
        return Promise.reject(boom.notFound("Not Found"));
      }

      const updatedProducts: IOrder = order.products
        .filter((product: IProduct) => {
          return (
            order.products.findIndex((oldProduct: IProduct) => {
              return oldProduct.id === product.id;
            }) !== -1
          );
        })
        .map((product: IProduct) => {
          const index: number = order.products.findIndex(
            (raw: IProduct) => raw.id === product.id
          );

          if (index == -1) {
            return null;
          }

          const quantity = order.products[index].quantity;
          const price: number = product.price;

          return {
            ...product,
            quantity,
            subtotal: quantity * price
          };
        })
        .filter((product: IProduct) => product);

      return Promise.resolve(
        ordersDataSource.update({
          ...order,
          products: updatedProducts,
          total: calculateTotal(updatedProducts)
        })
      );
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const cancelOrderById = async (id: string): Promise<any> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      if (order.cancelled) {
        return Promise.reject(response.badRequest(error.orderIsCancelled));
      }

      return ordersDataSource.update({
        ...order,
        cancelled: true
      });
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getAll,
    createOne,
    updateOneById,
    cancelOrderById
  };
};
