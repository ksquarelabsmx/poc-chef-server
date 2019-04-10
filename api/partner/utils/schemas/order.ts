import * as Joi from "joi";

const orderId = Joi.string().uuid();

const order = {
  user_id: Joi.string()
    .uuid()
    .required(),
  event_id: Joi.string()
    .uuid()
    .required(),
  price: Joi.number()
    .positive()
    .min(0)
    .required(),
  order_product_id: Joi.array()
    .items(Joi.string().uuid())
    .required(),
  created_by: Joi.string()
    .uuid()
    .required()
};

export const orderSchema = { orderId, order };
