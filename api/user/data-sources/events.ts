import { IEvent } from "../models/event";

const events: IEvent[] = [
  {
    id: "1",
    name: "Tortas",
    created_at: 1554736045107,
    expiration_date: 1554763958293,
    orders: [
      {
        id: "1",
        event_id: "1",
        created_at: 1554736045107,
        products: [
          {
            id: "1",
            name: "Poc Chuc Torta",
            price: 25,
            created_at: 1554736045107,
            quantity: 2,
            subtotal: 50
          }
        ],
        cancelled: false,
        total: 50
      }
    ]
  },
  {
    id: "2",
    name: "Fondita Rubí",
    created_at: 1555763958293,
    expiration_date: 1555763958293,
    orders: [
      {
        id: "2",
        event_id: "2",
        created_at: 1554736045107,
        products: [
          {
            id: "2",
            name: "Frijol Con Puerco",
            price: 50,
            created_at: 1554736045107,
            quantity: 1,
            subtotal: 50
          }
        ],
        cancelled: false,
        total: 50
      }
    ]
  }
];

const ComparatorType = () => ({ comparator: "", value: 0 });

const compare = (comparatorType: IComparatorType = ComparatorType(), event) => {
  if (comparatorType.comparator === "lessThan") {
    return event.expiration_date < comparatorType.value;
  }

  return false;
};

interface IComparatorType {
  comparator: string;
  value: number;
}

interface IFindQuery {
  expirationDate?: IComparatorType;
}

export const find = (query: IFindQuery = {}): Promise<IEvent[]> => {
  if (query.expirationDate) {
    return Promise.resolve(
      events.filter(event => {
        return compare(query.expirationDate, event);
      })
    );
  }

  return Promise.resolve(events);
};
