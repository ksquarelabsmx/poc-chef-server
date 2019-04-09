import { IEvent } from "../models/event";

export interface IEventsDataSource {
  update: (event: IEvent) => IEvent;
  save: (event: IEvent) => IEvent;
  find: (query?: any) => IEvent[];
}
