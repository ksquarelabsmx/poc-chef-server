import * as Joi from "joi";

const orderIdSchema = Joi.string().uuid();

const createOrderSchema = {
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

export { orderIdSchema, createOrderSchema };
