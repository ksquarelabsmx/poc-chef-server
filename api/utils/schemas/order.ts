import * as Joi from "joi";

const orderIdSchema = Joi.string().uuid();

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
      .uuid()
      .required(),
    created_at: Joi.number().required()
  }).required(),
  owner: Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
    name: Joi.string()
      .max(36)
      .required()
  }).required(),
  paid: Joi.boolean().required(),
  canceled: Joi.boolean().required()
};

export { orderIdSchema, createOrderSchema };
