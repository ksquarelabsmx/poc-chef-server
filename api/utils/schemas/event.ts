import * as Joi from "joi";

const eventIdSchema = Joi.string().uuid();

const createEventSchema = {
  event_name: Joi.string()
    .max(250)
    .required(),
  start_date: Joi.date()
    .timestamp("unix")
    .min("now")
    .required(),
  expiration_date: Joi.date()
    .timestamp("unix")
    .min(Joi.ref("start_date"))
    .required(),
  start_hour: Joi.number()
    .positive()
    .min(0)
    .max(1440)
    .required(),
  end_hour: Joi.number()
    .positive()
    .greater(Joi.ref("start_hour"))
    .required(),
  poc_chuc_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  poc_chuc_torta_amount: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_torta_amount: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  total: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  finished: Joi.boolean().required()
};

export { eventIdSchema, createEventSchema };
