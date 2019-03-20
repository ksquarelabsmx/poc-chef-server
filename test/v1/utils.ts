import { IEvent } from "./../../api/interfaces/event";
import * as moment from "moment";

export const server: string = "http://localhost:3000";
export const healthURI: string = "/v1/ping";
export const eventURI: string = "/v1/events";
export const userURI: string = "/v1/users";
export const authURI: string = "/v1/auth";

const futureDate = (days: number, hours: number): number =>
  moment()
    .utc()
    .add(days, "days")
    .add(hours, "hour")
    .unix();

export const eventMockDTO = {
  event_name: "Tortastic",
  start_date: futureDate(1, 0), // epoch
  expiration_date: futureDate(1, 2), // epoch
  start_hour: 800,
  end_hour: 1200,
  created_by: "6d623d08-113c-4565-81b2-e17c90331241"
};

export const eventMock: IEvent = {
  eventName: "Tortastic",
  startDate: futureDate(1, 0), // epoch
  expirationDate: futureDate(1, 2), // epoch
  startHour: 800,
  endHour: 1200,
  createdBy: "6d623d08-113c-4565-81b2-e17c90331241"
};

export const userMock = {
  name: "Admin Admin",
  password: "4dm1n",
  email: "admin@example.com",
  role: "admin partner"
};

export const loginMock = {
  email: "admin@example.com",
  password: "4dm1n"
};
