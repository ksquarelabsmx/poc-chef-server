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

const EventRountes = "/v1/events";

module.exports = app => {
  app.get(EventRountes, eventController.getEvents);
  app.get(
    EventRountes + ":eventId",
    validation({ eventId: eventIdSchema }, "params"),
    eventController.getEvent
  );
  app.put(
    EventRountes + "/:eventId",
    validation({ eventId: eventIdSchema }, "params"),
    validation(createEventSchema),
    eventController.updateEvent
  );
  app.post(
    [EventRountes, EventRountes + "/"],
    validation(createEventSchema),
    eventController.createEvent
  );
  app.patch(
    EventRountes + ":eventId",
    validation(createEventSchema),
    eventController.markEventAsFinished
  );
};
