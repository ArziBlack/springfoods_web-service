import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  first_name: Joi.string().min(1).required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  last_name: Joi.string().optional().allow(""),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  phone_number: Joi.string().optional().allow(""),
  zip_code: Joi.number().optional(),
  city: Joi.string().optional().allow(""),
  state: Joi.string().optional().allow(""),
  country: Joi.string().optional().allow(""),
  street: Joi.string().optional().allow(""),
  date_of_birth: Joi.date().optional(),
  role: Joi.string().optional(),
  gender: Joi.string().optional(),
  isEmailVerified: Joi.boolean().optional(),
  last_login: Joi.date().optional(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
