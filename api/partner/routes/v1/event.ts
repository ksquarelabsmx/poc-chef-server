import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import {
  validateJWT,
  filterRoles,
  onlyOwner,
  appendUser
} from "../../../common/policies";
import { validation } from "../../../common/middlewares";
import { uriBuilder } from "../../../common/utils/uri";
import { response } from "../../../common/utils/response";
import { eventController } from "../../controllers";
import { eventSchema } from "../../../common/utils/schemas";
import { eventMapper } from "./../../../common/mappers/event";
import { IEventDto, IEvent } from "./../../../common/models/event";
import { eventMemoryRepository } from "../../../common/repositories/event-memory-repository";

const eventsRouter = express.Router();
/**
 * @swagger
 * /v1/events:
 *   get:
 *     summary: Partner finds multiple events
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
  validateJWT("access"),
  filterRoles(["partner"]),
  async (req, res) => {
    try {
      const events: IEvent[] = await eventController.getEvents(req.query.type);
      const source: string = uriBuilder(req);
      const eventDto: IEventDto[] = events.map(eventMapper.toDto);
      res.send(response.success(eventDto, 200, source));
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
  onlyOwner(eventMemoryRepository),
  validation({ id: eventSchema.eventId }, "params"),
  async (req, res) => {
    try {
      const event: IEvent = await eventController.getEventById(req.params.id);
      const source: string = uriBuilder(req);
      const eventDto: IEventDto = eventMapper.toDto(event);
      res.send(response.success(eventDto, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.send(err.output.payload);
    }
  }
);

/**
 * @swagger
 * /v1/events/{id}:
 *   put:
 *     summary: Partner updates a single event
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *         required: true
 *         format: UUID
 *         description: ID of the event to return
 *       - in: body
 *         name: Event object
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Event"
 *           orders:
 *             $ref: "#/definitions/Order"
 *         required: true
 *         description: Event object that is going to be updated
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Event"
 *       400:
 *         description: Bad Request. Event has already finished
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       404:
 *         description: Not Found. Event Not Found.
 *       500:
 *         description: Internal Server Error
 */

eventsRouter.put(
  "/:id",
  validateJWT("access"),
  filterRoles(["partner"]),
  appendUser(),
  onlyOwner(eventMemoryRepository),
  validation({ id: eventSchema.eventId }, "params"),
  validation(eventSchema.event),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const event: IEvent = await eventController.updateEvent(
        req.params.id,
        eventMapper.toModel(req.body)
      );
      const eventDto: IEventDto = eventMapper.toDto(event);
      res.send(response.success(eventDto, 201, source));
    } catch (err) {
      debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

/**
 * @swagger
 * /v1/events:
 *   post:
 *     summary: Partner creates a new event
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: event
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Event"
 *         required: true
 *         description: Event object that is going to be added
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Event"
 *       400:
 *         description: Bad Request. Event name is required.
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       500:
 *         description: Internal Server Error
 */
eventsRouter.post(
  "/",
  validateJWT("access"),
  filterRoles(["partner"]),
  appendUser(),
  validation(eventSchema.event),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const data: IEvent = eventMapper.toModel(req.body);
      const event: IEvent = await eventController.createEvent(data);
      const eventDto: IEventDto = eventMapper.toDto(event);
      res.send(response.success(eventDto, 201, source));
    } catch (err) {
      debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);
/**
 * @swagger
 * /v1/events/action:
 *   post:
 *     summary: Partner special actions that updated specifics events values
 *     description: Event Actions that updates an specific value for one or multiple events
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Events
 *         required: true
 *         schema:
 *           properties:
 *             action:
 *               type: string
 *               enum:
 *               - mark_as_finish
 *               - mark_as_not_finish
 *               - mark_as_cancelled
 *               - mark_as_not_cancelled
 *               description: Name of the action that update a specific event value
 *             ids:
 *               type: array
 *               example:
 *               - 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *               - 6457a76f-b009-44dc-8e01-0895602932367
 *               - bcc53260-6912-414c-8f80-25838c1bae9c
 *               items:
 *                 type: string
 *                 format: UUID
 *                 description: Array of events ids
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: array
 *           example:
 *           - event 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653 not found
 *           - event 6457a76f-b009-44dc-8e01-089560293236 was already marked as finished
 *           - event bcc53260-6912-414c-8f80-25838c1bae9c successfully modified
 *           items:
 *             type: string
 *             description: Array of messages for every individual event id sent
 *       400:
 *         description: Bad Request. That action does not exists.
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       500:
 *         description: Internal Server Error
 */
eventsRouter.post(
  "/actions",
  validateJWT("access"),
  filterRoles(["partner"]),
  async (req, res) => {
    try {
      const source = uriBuilder(req);
      const order = await eventController.handleAction(req.body);
      res.send(response.success(order, 201, source));
    } catch (err) {
      debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

export { eventsRouter };
