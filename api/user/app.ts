import * as express from "express";
import { ordersRouter, eventsRouter } from "./routes/v1/";

export const user = express();

user.use("/v1/orders", ordersRouter);
user.use("/v1/events", eventsRouter);
