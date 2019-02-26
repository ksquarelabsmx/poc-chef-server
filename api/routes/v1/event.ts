import { eventController } from "../../controllers/event";
import { validation } from "../../middlewares/validationHandler";
import { eventIdSchema, createEventSchema } from "../../utils/schemas/event";

export const eventRoutes = (app: any) => {
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
