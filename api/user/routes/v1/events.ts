import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { validateJWT, filterRoles } from "../../../common/policies";
import { uriBuilder } from "../../../common/utils/uri";
import { response } from "../../../common/utils/response";

import { eventMemoryRepository } from "../../../common/repositories/event-memory-repository";
import { eventController } from "../../controllers";
import { validation } from "../../../common/middlewares";
import { eventSchema } from "../../../common/utils/schemas";
import { eventMapper } from "./../../../common/mappers/event";

const eventsRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event
 */

/**
 * @swagger
 * /user/api/v1/events:
 *   get:
 *     summary: User finds multiple events
 *     description: Return multiple events, depending of the opptional query related to the status of the event.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: eventType
 *         description: Optional value that could be considered for filtering the events.
 *         type: string
 *         enum:
 *         - current
 *         - past
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: "#/definitions/Event"
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       500:
 *         description: Internal Server Error
 */

eventsRouter.get(
  "/",
  //validateJWT("access"),
  //filterRoles(["user"]),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const events = await eventController.getEvents(req.query.type);
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

/**
 * @swagger
 * /v1/events/{id}:
 *   get:
 *     summary: Partner finds event by ID
 *     description: Return a single event
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: UUID
 *         example: 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *         required: true
 *         description: ID of the event to return
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Event"
 *       400:
 *         description: Bad Request. The id must be a valid UUID.
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       404:
 *         description: Not Found. Event Not Found.
 *       500:
 *         description: Internal Server Error
 */

eventsRouter.get(
  "/:id",
  validateJWT("access"),
  filterRoles(["partner"]),
  validation({ id: eventSchema.eventId }, "params"),
  async (req, res) => {
    try {
      const event = await eventController.getEventById(req.params.id);
      const source: string = uriBuilder(req);
      const eventDto = eventMapper.toDto(event);
      res.send(response.success(eventDto, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.send(err);
    }
  }
);

export { eventsRouter };
