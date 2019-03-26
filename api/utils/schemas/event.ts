import * as Joi from "joi";
import * as moment from "moment";

const eventId = Joi.string().uuid();

const event = {
  event_name: Joi.string().required(),

  start_date: Joi.number()
    .min(moment().unix()) // don't allow start_date in past
    .required(),

  expiration_date: Joi.number()
    .min(Joi.ref("start_date"))
    .required(),

  start_hour: Joi.number()
    .min(0)
    .max(1440) // time in seconds
    .required(),

  end_hour: Joi.number()
    .max(1440) // time in seconds
    .required(),

  created_by: Joi.string()
    .uuid()
    .required()
};

export const eventSchema = { eventId, event };
