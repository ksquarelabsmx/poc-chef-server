import * as moment from "moment";

import { config } from "../../../config";
import { IOrderDto } from "../../../api/common/models/order";
import { authService } from "../../../api/partner/services";

export const server: string = `http://localhost:${config.server.port}/user/api`;
export const eventURI: string = "/v1/events";
export const authURI: string = "/v1/auth";
export const orderURI: string = "/v1/orders";

export const orderMockDto: IOrderDto = {
  user_name: "",
  event_id: "8c9ae830-dd56-4828-8503-c70355253de9",
  total: 50,
  order_folio: "0",
  products: [
    {
      id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a7",
      name: "Shrimp Torta",
      quantity: 2,
      price: 25,
      subtotal: 50,
      created_at: 1548000000,
      updated_at: 1548000000
    }
  ],
  created_by: "6d623d08-113c-4565-81b2-e17c90331241",
  paid: false,
  cancelled: false,
  created_at: 1548000000,
  updated_at: 1548000000
};

// pending promise
export const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyODQwNTIyLTBhZWEtNDIyYS04OTcyLTc3ZDczNzAxNjMwYSIsImVtYWlsIjoic2FtdWVsLnNhbGFzLnJleWVzQGdtYWlsLmNvbSIsIm5hbWUiOiJFZGdhciBTYW11ZWwgU2FsYXMgUmV5ZXMiLCJyb2xlIjoidXNlciIsInN1YiI6ImFjY2VzcyIsImF1ZCI6InVzZXIiLCJleHAiOjE1NjI2ODc2ODEsImlhdCI6MTU1NzQxNzI4MSwianRpIjoiMTZjMzgyYWQtYWMwOC00OWJhLTlhZTAtNDI0ZmIxNmQ0NmQ1In0.f4tC0n8eSNKfp-fJtGQeCctChliqhSzsQ7VFQGQ_-J8";
