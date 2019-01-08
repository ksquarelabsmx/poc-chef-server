const Joi = require('joi');

const eventIdSchema = Joi.string().max(50);

const createEventSchema = {
  // id: eventIdSchema.required(),
  event_name: Joi.string().max(150).required(),
  start_date: Joi.number().required(),
  end_date: Joi.number().required(),
  start_hour: Joi.number().positive().required(),
  end_hour: Joi.number().positive().required(),
  poc_chuc_torta_unitary_price: Joi.number().min(0).max(1000).required(),
  shrimp_torta_unitary_price: Joi.number().min(0).max(1000).positive().required(),
}

module.exports = {
  eventIdSchema,
  createEventSchema
};