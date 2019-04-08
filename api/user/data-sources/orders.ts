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
  },
  {
    id: "2",
    event_id: "1",
    products: [
      { id: "1", name: "Poc Chuc Torta", price: 25, quantity: 2, subtotal: 50 },
      { id: "2", name: "Shrimp Torta", price: 25, quantity: 2, subtotal: 50 }
    ]
  }
];

interface IFindQuery {
  id?: string;
}

export const find = (query: IFindQuery = {}) => {
  if (query.id) {
    const docs = orders.filter(order => order.id === query.id);
    return Promise.resolve(docs);
  }

  return Promise.resolve(orders);
};

export const save = order => {
  const newOrder = {
    ...order,
    id: cuid()
  };
  orders.push(newOrder);
  return Promise.resolve(newOrder);
};

export const update = order => {
  const index = orders.findIndex(oldOrder => {
    return oldOrder.id === order.id;
  });

  orders[index] = order;
  return Promise.resolve(order);
};
