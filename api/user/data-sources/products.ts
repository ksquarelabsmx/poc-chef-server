const products = [
  {
    id: "1",
    name: "Poc Chuc Torta",
    price: 25
  },
  {
    id: "2",
    name: "Shrimp Torta",
    price: 25
  }
];

interface IFindQuery {
  id?: string;
}

export const find = (query: IFindQuery = {}) => {
  if (query.id) {
    const result = products.filter(prod => query.id === prod.id);
    return Promise.resolve(result);
  }

  return Promise.resolve(products);
};
