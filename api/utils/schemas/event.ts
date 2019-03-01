import * as Joi from "joi";
import * as moment from "moment";

const eventIdSchema = Joi.string().max(36);

const eventSchema = {
  event_name: Joi.string().required(),

  start_date: Joi.number()
    .min(moment().unix())
    .required(),

  expiration_date: Joi.number()
    .greater(Joi.ref("start_date"))
    .required(),

  start_hour: Joi.number()
    .min(0)
    .max(24 * 60)
    .required(),

  end_hour: Joi.number()
    .greater(Joi.ref("start_hour"))
    .max(24 * 60)
    .required(),

  poc_chuc_torta_unitary_price: Joi.number()
    .positive()
    .required(),

  shrimp_torta_unitary_price: Joi.number()
    .positive()
    .required()
};

export { eventIdSchema, eventSchema };
