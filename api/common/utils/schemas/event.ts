import * as Joi from "joi";
import * as moment from "moment";

const eventId = Joi.string().uuid();

const event = {
  name: Joi.string().required(),

  expiration_date: Joi.number()
    .min(Joi.ref("created_at"))
    .required(),

  end_hour: Joi.number()
    .min(0)
    .max(1440) // time in seconds
    .required(),

  created_by: Joi.string()
    .uuid()
    .required(),

  total: Joi.number()
    .positive()
    .min(0)
    .required(),

  orders: Joi.array()
    .items(Joi.object())
    .required(),

  marked_as_finished: Joi.boolean().required(),

  cancelled: Joi.boolean().required(),

  created_at: Joi.number().required(),

  updated_at: Joi.number().required()
};

export const eventSchema = { eventId, event };
