import { IOrder } from "../../common/models/order";

export const OrdersController = orderService => {
  const getAll = (): Promise<IOrder[]> => {
    return orderService.getAll();
  };

  const createOrder = (order: IOrder): Promise<IOrder> => {
    return orderService.createOne(order);
  };

  const updateOrderById = (id: string, order: IOrder): Promise<IOrder> => {
    return orderService.updateOneById(id, order);
  };

  const cancelOrderById = (id: string): Promise<IOrder> => {
    return orderService.cancelOrderById(id);
  };

  return {
    getAll,
    createOrder,
    updateOrderById,
    cancelOrderById
  };
};
