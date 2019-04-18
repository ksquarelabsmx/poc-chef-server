import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { uriBuilder } from "../../../common/utils/uri";
import { response } from "../../../common/utils/response";

import { eventMapper } from "../../../common/mappers/event";
import { eventsController } from "../../controllers/";
import { validateJWT, filterRoles } from "../../../common/policies";

const eventsRouter = express.Router();

eventsRouter.get(
  "/",
  validateJWT("access"),
  filterRoles(["user"]),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const events = await eventsController.getEvents(req.query.type);
      const eventsDto = events.map(eventMapper.toDto);
      res.send(response.success(eventsDto, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

export { eventsRouter };
