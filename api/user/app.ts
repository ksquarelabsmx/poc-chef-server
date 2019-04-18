import * as express from "express";
import { ordersRouter, eventsRouter, authRouter } from "./routes/v1/";

export const user = express();

user.use("/v1/orders", ordersRouter);
user.use("/v1/events", eventsRouter);
user.use("/v1/auth", authRouter);
