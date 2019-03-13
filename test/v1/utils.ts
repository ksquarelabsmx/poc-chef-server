import { IEvent } from "./../../api/interfaces/event";
import * as moment from "moment";

export const server: string = "http://localhost:3000";
export const healthURI: string = "/v1/ping";
export const eventURI: string = "/v1/events";

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
  poc_chuc_torta_unitary_price: 25,
  shrimp_torta_unitary_price: 30
};

export const eventMock: IEvent = {
  eventName: "Tortastic",
  startDate: futureDate(1, 0), // epoch
  expirationDate: futureDate(1, 2), // epoch
  startHour: 800,
  endHour: 1200,
  pocChucTortaUnitaryPrice: 25,
  shrimpTortaUnitaryPrice: 30
};
