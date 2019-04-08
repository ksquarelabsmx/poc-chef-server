const orders = [
  {
    id: "1",
    name: "Tortas",
    date_created: 1554736045107,
    orders: [
      { id: 1, name: "Poc Chuc Torta", price: 25, quantity: 2, subtotal: 50 }
    ],
    total: 50
  }
];

export const find = () => {
  return new Promise(resolve => {
    resolve(orders);
  });
};
