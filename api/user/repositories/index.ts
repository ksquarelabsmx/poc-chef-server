import { OrdersRepository } from "./orders";
import { ordersDataSource, productsDataSource } from "../data-sources";

const ordersRepository = OrdersRepository(ordersDataSource, productsDataSource);

export { ordersRepository };
