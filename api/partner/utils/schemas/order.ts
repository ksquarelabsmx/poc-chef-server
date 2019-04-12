import * as Joi from "joi";

const orderId = Joi.string().uuid();

const order = {
  user_id: Joi.string()
    .uuid()
    .required(),

  event_id: Joi.string()
    .uuid()
    .required(),

  event_name: Joi.string().required(),

  total: Joi.number()
    .positive()
    .min(0)
    .required(),

  products: Joi.array()
    .items(Joi.string().uuid())
    .required(),

  created_by: Joi.string()
    .uuid()
    .required(),

  paid: Joi.boolean().required(),

  cancelled: Joi.boolean().required(),

  created_at: Joi.number().required(),

  updated_at: Joi.number().required()
};

export const orderSchema = { orderId, order };
