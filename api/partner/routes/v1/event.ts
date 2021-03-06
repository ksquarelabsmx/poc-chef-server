import { appendUser } from "../../policies/access-control";
import { Express } from "express";
import { validateJWT, filterRoles, onlyOwner } from "../../policies";
import { eventMemoryRepository } from "../../../common/repositories/event-memory-repository";
import { eventController } from "../../controllers";
import { validation } from "../../middlewares";
import { eventSchema } from "../../utils/schemas";
import { uriBuilder } from "../../utils/uri";
import { response } from "../../utils/response";
import debug = require("debug");
import chalk from "chalk";
import { eventMapper } from "../../mappers/event";

export const eventRoutes = (app: Express) => {
  /**
   * @swagger
   * definitions:
   *   Event:
   *     required:
   *       - event_name
   *       - start_date
   *       - expiration_date
   *       - start_hour
   *       - end_hour
   *     properties:
   *       id:
   *         type: string
   *       event_name:
   *         type: string
   *       start_date:
   *         type: number
   *       expiration_date:
   *         type: number
   *       start_hour:
   *         type: number
   *       end_hour:
   *         type: number
   *
   *   EventDetails:
   *     required:
   *       - id
   *       - event_name
   *       - start_date
   *       - expiration_date
   *       - start_hour
   *       - end_hour
   *       - created_by
   *       - total
   *       - finished
   *       - cancelled
   *       - created_at
   *       - updated_at
   *     properties:
   *       id:
   *         type: string
   *       event_name:
   *         type: string
   *       start_date:
   *         type: number
   *       expiration_date:
   *         type: number
   *       start_hour:
   *         type: number
   *       end_hour:
   *         type: number
   *       created_by:
   *         type: string
   *       total:
   *         type: number
   *       finished:
   *         type: boolean
   *       cancelled:
   *         type: boolean
   *       created_at:
   *         type: number
   *       updated_at:
   *         type: number
   *
   *   Order:
   *     required:
   *       - id
   *       - user_id
   *       - event_id
   *       - price
   *       - order_product_id
   *       - created_by
   *       - paid
   *       - cancelled
   *       - created_at
   *       - updated_at
   *     properties:
   *       id:
   *         type: string
   *       user_id:
   *         type: string
   *       event_id:
   *         type: string
   *       price:
   *         type: number
   *       order_product_id:
   *         type: array
   *         items:
   *           type: string
   *       created_by:
   *         type: string
   *       paid:
   *         type: boolean
   *       cancelled:
   *         type: boolean
   *       created_at:
   *         type: number
   *       updated_at:
   *         type: number
   */

  /**
   * @swagger
   * tags:
   *   name: Events
   *   description: Events
   */

  /**
   * @swagger
   * /v1/events:
   *   get:
   *     description: Return all events
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Events
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: query
   *         name: eventType
   *         schema:
   *           type: string
   *         description: Query to return "current" or "past"
   *     responses:
   *       200:
   *         description: Get all events
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             $ref: "#/definitions/EventDetails"
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal Server Error
   */

  app.get(
    "/v1/events",
    validateJWT("access"),
    filterRoles(["user", "partner"]),
    async (req, res) => {
      try {
        const events = await eventController.getEvents(req.query.type);
        const source: string = uriBuilder(req);
        res.send(response.success(events, 200, source));
      } catch (err) {
        debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
        res.json({
          status: 500,
          message: "Internal Server Error"
        });
      }
    }
  );

  /**
   * @swagger
   * /v1/events/{id}:
   *   get:
   *     description: Return event
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Events
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: UUID of the event to get
   *     responses:
   *       200:
   *         description: Get event
   *         schema:
   *           properties:
   *             id:
   *               type: string
   *             event_name:
   *               type: string
   *             start_date:
   *               type: number
   *             expiration_date:
   *               type: number
   *             start_hour:
   *               type: number
   *             end_hour:
   *               type: number
   *             created_by:
   *               type: string
   *             orders:
   *               type: array
   *               items:
   *                 $ref: "#/definitions/Order"
   *                 type: object
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  app.get(
    "/v1/events/:id",
    validateJWT("access"),
    filterRoles(["partner"]),
    validation({ id: eventSchema.eventId }, "params"),
    async (req, res) => {
      try {
        const event = await eventController.getEventById(req.params.id);
        const source: string = uriBuilder(req);
        res.send(response.success(event, 200, source));
      } catch (err) {
        debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
        res.send({
          status: 500,
          message: "Internal Server Error"
        });
      }
    }
  );

  /**
   * @swagger
   * /v1/events/{id}:
   *   put:
   *     description: Update event
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Events
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: UUID of the event to get
   *       - in: body
   *         name: Event object
   *         schema:
   *           type: object
   *           $ref: "#/definitions/Event"
   *         required: true
   *         description: Event object
   *     responses:
   *       200:
   *         description: Update event
   *         schema:
   *           type: object
   *           $ref: "#/definitions/EventDetails"
   *       400:
   *         description: Bad Request. Event has already finished
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  app.put(
    "/v1/events/:id",
    validateJWT("access"),
    filterRoles(["partner"]),
    onlyOwner(eventMemoryRepository),
    appendUser(),
    validation({ id: eventSchema.eventId }, "params"),
    validation(eventSchema.event),
    async (req, res) => {
      try {
        const source = uriBuilder(req);
        const event = await eventController.updateEvent(
          req.params.id,
          eventMapper.toModel(req.body)
        );
        const eventDTO = eventMapper.toDTO(event);
        res.send(response.success(eventDTO, 201, source));
      } catch (err) {
        debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
        res.json({
          status: 500,
          message: "Internal Server Error"
        });
      }
    }
  );

  /**
   * @swagger
   * /v1/events:
   *   post:
   *     description: Create event
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Events
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
   *         description: Event object
   *     responses:
   *       200:
   *         description: Create event
   *         schema:
   *           type: object
   *           $ref: "#/definitions/EventDetails"
   *       400:
   *         description: Bad Request. Event name is required.
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal Server Error
   */
  app.post(
    "/v1/events",
    validateJWT("access"),
    filterRoles(["partner"]),
    appendUser(),
    validation(eventSchema.event),
    async (req, res) => {
      try {
        const source: string = uriBuilder(req);
        const data = eventMapper.toModel(req.body);
        const event = await eventController.createEvent(data);
        const eventDTO = eventMapper.toDTO(event);
        res.send(response.success(eventDTO, 201, source));
      } catch (err) {
        debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
        res.json({
          status: 500,
          message: "Internal Server Error"
        });
      }
    }
  );
};
