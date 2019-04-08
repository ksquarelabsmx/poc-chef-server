import * as express from "express";
import { ordersRouter } from "./routes/v1/orders";

export const user = express();

user.use("/v1/orders", ordersRouter);
