import { IOrder } from "../../common/models/order";

export const OrdersController = ordersRepository => {
  const getAll = (): Promise<IOrder[]> => {
    return ordersRepository.getAll();
  };

  const createOrder = (order: IOrder): Promise<IOrder> => {
    return ordersRepository.createOne(order);
  };

  const updateOrderById = (id: string, order: IOrder): Promise<IOrder> => {
    return ordersRepository.updateOneById(id, order);
  };

  const cancelOrderById = (id: string): Promise<IOrder> => {
    return ordersRepository.cancelOrderById(id);
  };

  return {
    getAll,
    createOrder,
    updateOrderById,
    cancelOrderById
  };
};
