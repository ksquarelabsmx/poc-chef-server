import { IEvent } from "../models/event";

export interface IEventRepository {
  find: (query?: any) => Promise<IEvent[]>;
  update: (event: IEvent) => Promise<IEvent>;
  save: (event: IEvent) => Promise<IEvent>;
}
