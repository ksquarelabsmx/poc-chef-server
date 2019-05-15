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
        ...prod,
        quantity: rawProduct.quantity,
        subtotal: rawProduct.quantity * prod.price
      };
    });
};

const calculateTotal = (products: IOrderProduct[]): number => {
  return products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
};

const isFinished = (event: IEvent): boolean => {
  return (
    event.cancelled ||
    event.expirationDateTime <
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

  const getOrderById = async (id: string): Promise<any> => {
    try {
      const order: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Not Found"));
      }

      return Promise.resolve(fp.head(order));
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const createOne = async (data: IOrder): Promise<IOrder> => {
    try {
      const [eventFinded]: IEvent[] = await eventsDataSource.find({
        id: data.eventId
      });

      if (fp.isEmpty(eventFinded)) {
        throw Promise.reject(response.badRequest(error.eventNotExist));
      }
      if (isFinished(eventFinded)) {
        throw Promise.reject(response.badRequest(error.eventIsFinished));
      }

      const records: IProduct[][] = await Promise.all(
        data.products.map(
          async (product: IProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const products: IOrderProduct[] = normalizeProducts(
        records,
        data.products
      );
      if (products.length !== data.products.length) {
        throw Promise.reject(boom.notFound("Product Not Found"));
      }

      return Promise.resolve(
        ordersDataSource.save({
          ...data,
          products: products,
          total: calculateTotal(products)
        })
      );
    } catch (err) {
      return err;
    }
  };

  const updateOneById = async (id: string, order: any): Promise<IOrder> => {
    try {
      const [oldOrder]: IOrder[] = await ordersDataSource.find({ id });
      const [eventFinded]: IEvent[] = await eventsDataSource.find({
        id: order.eventId
      });

      if (fp.isEmpty(eventFinded)) {
        throw Promise.reject(response.badRequest(error.eventNotExist));
      }
      if (isFinished(eventFinded)) {
        throw Promise.reject(response.badRequest(error.eventIsFinished));
      }
      if (fp.isEmpty(oldOrder)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
      }
      //validate if the request order.eventId is the same as the existing order.eventId
      if (oldOrder.eventId !== order.eventId) {
        throw Promise.reject(response.badRequest(error.orderEventDifferent));
      }
      if (oldOrder.cancelled) {
        throw Promise.reject(response.badRequest(error.orderIsCancelled));
      }
      if (oldOrder.paid) {
        throw Promise.reject(response.badRequest(error.orderIsPaid));
      }

      const records = await Promise.all(
        order.products.map(
          async (product: IProduct): Promise<IProduct[]> => {
            return Promise.resolve(
              productRepository.find({
                id: product.id
              })
            );
          }
        )
      );
      const orderProducts: IOrderProduct[] = normalizeProducts(
        records,
        order.products
      );
      if (orderProducts.length !== order.products.length) {
        throw Promise.reject(boom.notFound("Product Not Found"));
      }

      return Promise.resolve(
        ordersDataSource.update({
          ...order,
          id,
          products: orderProducts,
          total: calculateTotal(orderProducts)
        })
      );
    } catch (err) {
      return err;
    }
  };

  const cancelOrderById = async (id: string): Promise<IOrder> => {
    try {
      const [order]: IOrder[] = await ordersDataSource.find({ id });

      if (fp.isEmpty(order)) {
        throw Promise.reject(boom.notFound("Order Not Found"));
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

  return {
    getAll,
    getOrderById,
    createOne,
    updateOneById,
    cancelOrderById
  };
};
