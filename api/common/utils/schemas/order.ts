import * as Joi from "joi";

const orderId = Joi.string().uuid();

const order = {
  user_name: Joi.string().required(),
  event_id: Joi.string()
    .uuid()
    .required(),
  total: Joi.number()
    .positive()
    .allow(0)
    .min(0)
    .required(),
  order_folio: Joi.string().required(),
  products: Joi.array()
    .items(Joi.object())
    .required(),
  created_by: Joi.string()
    .uuid()
    .required(),
  paid: Joi.boolean().required(),
  cancelled: Joi.boolean().required(),
  created_at: Joi.number()
    .min(0)
    .required(),
  updated_at: Joi.number()
    .min(Joi.ref("created_at"))
    .required()
};

export const orderSchema = { orderId, order };
