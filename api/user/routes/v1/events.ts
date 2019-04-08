import * as express from "express";
import { eventsController } from "../../controllers/";

const eventsRouter = express.Router();

eventsRouter.get("/", eventsController.getAll);

export { eventsRouter };
