import Joi from "joi";

export const reviewValidationSchema = Joi.object<IReviewRequest>({
  user_id: Joi.string().required(),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  product: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  rating: Joi.number().min(1).max(5).required(),
  review_title: Joi.string().min(3).max(100).required(),
  review_content: Joi.string().min(10).required(),
});
