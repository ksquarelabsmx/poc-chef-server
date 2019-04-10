import * as moment from "moment";

import { event, order, auth } from "../../../api/partner/interfaces";
import { authService } from "../../../api/partner/services";

export const server: string = "http://localhost:3000";
export const healthURI: string = "/v1/ping";
export const eventURI: string = "/v1/events";
export const userURI: string = "/v1/users";
export const authURI: string = "/v1/auth";
export const orderURI: string = "/v1/orders";

const futureDate = (days: number, hours: number): number =>
  moment()
    .utc()
    .add(days, "days")
    .add(hours, "hour")
    .unix();

export const eventMockDTO: event.IEventDto = {
  event_name: "Tortastic",
  start_date: futureDate(1, 0), // epoch
  expiration_date: futureDate(1, 2), // epoch
  start_hour: 800,
  end_hour: 1200,
  created_by: "6d623d08-113c-4565-81b2-e17c90331241"
};

export const eventMock: event.IEvent = {
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

export const loginMock: auth.ILogin = {
  email: "admin@example.com",
  password: "4dm1n"
};

export const orderMockDTO: order.IOrderDTO = {
  user_id: "6d623d08-113c-4565-81b2-e17c90331241",
  event_id: "8c9ae830-dd56-4828-8503-c70355253de9",
  price: 20,
  order_product_id: ["48f04396-e3be-4970-87d5-be2412639303"],
  created_by: "6d623d08-113c-4565-81b2-e17c90331241"
};

// pending promise
export const jwt = (async () => {
  const loginInfo = await authService.validateLogin({
    email: "maik@fakegmail.com",
    password: "plainpassword"
  });
  return loginInfo.jwt;
})();
