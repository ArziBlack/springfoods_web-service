export const mapReviewDocumentToResponse = (review: any): IReviewResponse => {
  return {
    user_id: review.user_id?.toString(),
    user: review.user,
    product: review.product,
    rating: review.rating,
    review_title: review.review_title,
    review_content: review.review_content,
  };
};
