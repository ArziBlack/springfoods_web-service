import Joi from "joi";
import { ICart } from "../../interfaces/cart";

export const cartValidatorSchema = Joi.object<ICart>({});