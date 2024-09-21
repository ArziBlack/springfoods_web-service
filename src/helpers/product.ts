import { Types } from "mongoose";

export const mapProductDocumentToResponse = (
  product: any,
): IProductResponse => {
  return {
    _id: product._id?.toString(),
    category_id: product.category_id?.toString() || "",
    category: product.category || "",
    name: product.name,
    featured: product.featured,
    price: product.price,
    discount: product.discount,
    final_price: product.final_price,
    sku: product.sku,
    stock: product.stock,
    product_image: product.product_image,
    description: product.description,
    weight: product.weight,
    dimensions: product.dimensions,
    sizes: product.sizes,
    reviews: product.reviews.map((review: any) => ({
      user: review.user.toString(),
      rating: review.rating,
      review_title: review.review_title,
      review_content: review.review_content
    })),
    average_rating: product.average_rating,
    total_reviews: product.total_reviews,
    is_available: product.is_available,
    tags: product.tags,
    related_products:
      product.related_products?.map((rp: Types.ObjectId) => rp.toString()) ||
      [],
    vendor_id: product.vendor_id.toString(),
  };
};
