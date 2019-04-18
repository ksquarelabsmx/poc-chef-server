import * as express from "express";
import {
  authRouter,
  eventsRouter,
  ordersRouter,
  pingRouter,
  usersRouter
} from "./routes/v1/";

export const partner = express();

partner.use("/v1/auth", authRouter);
partner.use("/v1/events", eventsRouter);
partner.use("/v1/orders", ordersRouter);
partner.use("/v1/ping", pingRouter);
partner.use("/v1/users", usersRouter);
