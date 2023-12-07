import Joi from "joi";

export const orderSchema = Joi.object({
  orderNumber: Joi.string(),
  status: Joi.number(),
  fullName: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.number(),
  shipping: Joi.string(),
  products: Joi.array(),
  total: Joi.number(),
  userId: Joi.string(),
  payMethod: Joi.number(),
  isPaid: Joi.boolean(),
  discountCode: Joi.string().allow(''),
});
