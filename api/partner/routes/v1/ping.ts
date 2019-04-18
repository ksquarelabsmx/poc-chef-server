import * as express from "express";

import { pingController } from "../../controllers";

const pingRouter = express.Router();

pingRouter.get("/", pingController.pong);

export { pingRouter };
