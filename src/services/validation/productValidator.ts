import Joi from "joi";

export const productValidationSchema = Joi.object<IProductRequest>({
    category_id: Joi.string().optional(),
    category: Joi.string().optional(),
    name: Joi.string().min(3).max(100).required(),
    featured: Joi.boolean().required(),
    price: Joi.number().positive().required(),
    discount: Joi.number().min(0).max(100).optional(),
    final_price: Joi.number().positive().required(),
    sku: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    product_image: Joi.string().uri().required(),
    description: Joi.string().min(10).max(1000).required(),
    weight: Joi.number().positive().required(),
    dimensions: Joi.object({
        length: Joi.number().positive().required(),
        width: Joi.number().positive().required(),
        height: Joi.number().positive().required(),
    }).required(),
    sizes: Joi.array().items(Joi.string().valid("S", "M", "L", "XL", "XXL")).required(),
    is_available: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string()).min(1).required(),
    vendor_id: Joi.string().required()
});
