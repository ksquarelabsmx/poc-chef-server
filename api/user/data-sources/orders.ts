import * as cuid from "cuid";

const orders = [
  {
    id: "1",
    name: "Tortas",
    date_created: 1554736045107,
    event_id: "1",
    products: [
      { id: "1", name: "Poc Chuc Torta", price: 25, quantity: 2, subtotal: 50 }
    ],
    total: 50
  }
];

export const find = () => {
  return new Promise(resolve => {
    resolve(orders);
  });
};

export const save = order => {
  const newOrder = {
    ...order,
    id: cuid()
  };
  orders.push(newOrder);
  return Promise.resolve(newOrder);
};
