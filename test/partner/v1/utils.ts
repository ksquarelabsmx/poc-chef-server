import * as moment from "moment";

import { IEventDto } from "../../../api/common/models/event";
import { IOrderDto } from "../../../api/common/models/order";
import { authService } from "../../../api/partner/services";
import { ILogin } from "../../../api/partner/interfaces/auth";

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

export const eventMockDto: IEventDto = {
  name: "Tortastic",
  start_date: futureDate(1, 0), // epoch
  expiration_date: futureDate(1, 2), // epoch
  start_hour: 800,
  end_hour: 1200,
  created_by: "6d623d08-113c-4565-81b2-e17c90331241",
  total: 10,
  orders: [],
  marked_as_finished: false,
  cancelled: false,
  created_at: 1548000000,
  updated_at: 1548000000
};

export const userMock = {
  name: "Admin Admin",
  password: "4dm1n",
  email: "admin@example.com",
  role: "admin partner"
};

export const loginMock: ILogin = {
  email: "admin@example.com",
  password: "4dm1n"
};

export const orderMockDto: IOrderDto = {
  user_id: "6d623d08-113c-4565-81b2-e17c90331241",
  event_id: "8c9ae830-dd56-4828-8503-c70355253de9",
  event_name: "Tortastic",
  total: 10,
  products: [],
  created_by: "6d623d08-113c-4565-81b2-e17c90331241",
  paid: false,
  cancelled: false,
  created_at: 1548000000,
  updated_at: 1548000000
};

// pending promise
export const jwt = (async () => {
  const loginInfo = await authService.validateLogin({
    email: "maik@fakegmail.com",
    password: "plainpassword"
  });
  return loginInfo.jwt;
})();
