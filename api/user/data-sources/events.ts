import { IEvent } from "../../common/models/event";

const events: IEvent[] = [
  {
    id: "1",
    name: "Tortas",
    expirationDate: 1554763958293,
    startDate: 1554763958291,
    startHour: 1554763958291,
    endHour: 1554763958291,
    markedAsFinished: false,
    total: 50,
    createdBy: "1",
    cancelled: false,
    updatedAt: 1554736045107,
    createdAt: 1554736045107,
    orders: [
      {
        id: "1",
        eventId: "1",
        userId: "1",
        createdBy: "1",
        createdAt: 1554736045107,
        updatedAt: 1554736045107,
        products: [
          {
            id: "1",
            name: "Poc Chuc Torta",
            price: 25,
            createdAt: 1554736045107,
            updatedAt: 1554736045107,
            quantity: 2,
            subtotal: 50
          }
        ],
        cancelled: false,
        paid: false,
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
