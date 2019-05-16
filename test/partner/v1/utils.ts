import * as moment from "moment";

import { config } from "../../../config";
import { IEventDto } from "../../../api/common/models/event";
import { authService } from "../../../api/partner/services";
import { ILogin } from "../../../api/common/interfaces/auth";

export const server: string = `http://localhost:${config.server.port}`;
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
  expiration_date_time: futureDate(1, 2), // epoch
  created_by: "",
  total: 0,
  orders: [],
  cancelled: false,
  created_at: 1548000000,
  updated_at: 1548000000,
  products: [
    {
      id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
      name: "Poc Chuc Torta",
      price: 25,
      created_at: 1548000000,
      updated_at: 1548000000
    },
    {
      id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a7",
      name: "Shrimp Torta",
      price: 25,
      created_at: 1548000000,
      updated_at: 1548000000
    }
  ]
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

// pending promise
export const jwt = (async () => {
  const loginInfo = await authService.validateLogin({
    email: "maik@fakegmail.com",
    password: "plainpassword"
  });
  return loginInfo.jwt;
})();
