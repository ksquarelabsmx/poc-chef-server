"use strict";

/**
 * author: ivan sabido
 * date: 27/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const eventController = require("../../controllers/event");
const validation = require("../../middlewares/validationHandler");
const {
  eventIdSchema,
  createEventSchema
} = require("../../utils/schemas/event");

module.exports = app => {
  app.get("/v1/events", eventController.getEvents);
  app.get(
    "/v1/events/:eventId",
    validation({ eventId: eventIdSchema }, "params"),
    eventController.getEvent
  );
  app.put(
    "/v1/events/:eventId",
    validation({ eventId: eventIdSchema }, "params"),
    validation(createEventSchema),
    eventController.updateEvent
  );
  app.post(
    "/v1/events",
    validation(createEventSchema),
    eventController.createEvent
  );
};
