import * as Joi from "joi";
import * as moment from "moment";

const eventId = Joi.string().uuid();

const event = {
  name: Joi.string().required(),
  expiration_date_time: Joi.number()
    .min(moment().unix())
    .required(),
  created_by: Joi.string()
    .uuid()
    .required(),
  total: Joi.number()
    .positive()
    .allow(0)
    .min(0)
    .required(),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string().required(),
        price: Joi.number()
          .positive()
          .allow(0)
          .min(0)
          .required(),
        created_at: Joi.number()
          .min(0)
          .required(),
        updated_at: Joi.number()
          .min(0)
          .required()
      })
    )
    .required(),
  orders: Joi.array()
    .items(Joi.object())
    .required(),
  cancelled: Joi.boolean().required(),
  created_at: Joi.number()
    .min(0)
    .required(),
  updated_at: Joi.number()
    .min(Joi.ref("created_at"))
    .required()
};

export const eventSchema = { eventId, event };
