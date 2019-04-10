import * as express from "express";
import * as eventMapper from "../../../common/mappers/event";
import { eventsController } from "../../controllers/";

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res) => {
  const events = await eventsController.getEvents({ pastEvents: true });
  const eventsDto = events.map(eventMapper.toDto);
  return res.json({
    events: eventsDto
  });
});

export { eventsRouter };
