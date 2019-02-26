import * as Joi from "joi";

const orderIdSchema = Joi.string().max(36);

const createOrderSchema = {
  total: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_tortas_total: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  shrimp_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  poc_chuc_tortas_total: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  poc_chuc_torta_unitary_price: Joi.number()
    .positive()
    .min(0)
    .max(1000)
    .required(),
  event: Joi.object({
    id: Joi.string()
      .max(36)
      .required(),
    created_at: Joi.number().required()
  }).required(),
  owner: Joi.object({
    id: Joi.string()
      .max(36)
      .required(),
    name: Joi.string()
      .max(36)
      .required()
  }).required()
};

export { orderIdSchema, createOrderSchema };
