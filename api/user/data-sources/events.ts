const events = [
  {
    id: "1",
    name: "Tortas",
    date_created: 1554736045107,
    expiration_date: 1554763958293,
    orders: [
      {
        id: 1,
        products: [{ id: 1, name: "Poc Chuc Torta", price: 25 }]
      }
    ]
  },
  {
    id: "2",
    name: "Fondita Rubí",
    date_created: 1555763958293,
    expiration_date: 1555763958293,
    orders: [
      {
        id: 2,
        products: [{ id: 1, name: "Frijol Con Puerco", price: 25 }]
      }
    ]
  }
];

const compare = (field, event) => {
  if (field.comparator === "lessThan") {
    return event.expiration_date < field.value;
  }

  return false;
};

interface IFindQuery {
  expirationDate?: {
    comparator: string;
    value: number;
  };
}

export const find = (query: IFindQuery = {}) => {
  if (query.expirationDate) {
    return Promise.resolve(
      events.filter(event => {
        return compare(query.expirationDate, event);
      })
    );
  }

  return Promise.resolve(events);
};
