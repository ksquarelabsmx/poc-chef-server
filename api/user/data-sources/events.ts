const events = [
  {
    id: "1",
    name: "Tortas",
    date_created: 1554736045107,
    orders: [{ id: 1, name: "Poc Chuc Torta", price: 25 }]
  },
  {
    id: "2",
    name: "Fondita Rubí",
    date_created: 1554736045107,
    orders: [{ id: 1, name: "Frijol Con Puerco", price: 25 }]
  }
];

export const find = () => {
  return new Promise(resolve => {
    resolve(events);
  });
};
