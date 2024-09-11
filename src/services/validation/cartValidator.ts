import Joi from "joi";
import { ICart, ICartItem } from "../../interfaces/cart";

export const cartItemValidationSchema = Joi.object<ICartItem>({
  product: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().positive().required(),
});

export const cartValidatorSchema = Joi.object<ICart>({
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  items: Joi.array().items(cartItemValidationSchema).min(1).required(),
  price: Joi.number().positive().required(),
  total: Joi.number().positive().required(),
});
