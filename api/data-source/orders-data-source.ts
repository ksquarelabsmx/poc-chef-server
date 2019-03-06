import { v4 as uuid } from "uuid";

const orders = [
  {
    id: uuid(),
    total: 45,
    shrimp_tortas_total: 1,
    shrimp_torta_unitary_price: 25,
    poc_chuc_tortas_total: 1,
    poc_chuc_torta_unitary_price: 20,
    event: {
      id: "1",
      created_at: 1000000000
    },
    owner: {
      id: "1",
      name: "Juan Perez"
    },
    paid: false,
    canceled: false
  }
];

const find = (query?: any): any => {
  if (query) {
    const key = Object.keys(query)[0];
    return orders.filter((order: any) => order[key] === query[key]);
  } else {
    return orders;
  }
};

const save = (order: any): any => {
  order.id = uuid();
  orders.push(order);
  return order;
};

const update = (order: any): any => {
  const index = orders.findIndex((ord: any) => ord.id === order.id);
  (<any>orders)[index] = { ...order };
  return (<any>orders)[index];
};

export const ordersDataSource = { find, save, update };
