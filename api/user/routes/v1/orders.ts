import * as express from "express";
import { ordersController } from "../../controllers/";

const ordersRouter = express.Router();

ordersRouter.get("/", ordersController.getAll);

export { ordersRouter };
