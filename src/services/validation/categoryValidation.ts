import Joi from "joi";
import { ICreateCategory } from "../../interfaces/category";

export const categoryValidationSchema = Joi.object<ICreateCategory>({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 2 characters",
    "string.max": "Name should have less than or equal to 50 characters",
    "any.required": "Name is a required field",
  }),
  image: Joi.string().uri().required().messages({
    "string.base": "Image should be a type of text",
    "string.empty": "Image URL cannot be empty",
    "string.uri": "Image must be a valid URL",
    "any.required": "Image is a required field",
  }),
  slug: Joi.string().alphanum().min(2).max(50).required().messages({
    "string.base": "Slug should be a type of text",
    "string.empty": "Slug cannot be empty",
    "string.alphanum": "Slug must only contain alphanumeric characters",
    "string.min": "Slug should have at least 2 characters",
    "string.max": "Slug should have less than or equal to 50 characters",
    "any.required": "Slug is a required field",
  }),
});
