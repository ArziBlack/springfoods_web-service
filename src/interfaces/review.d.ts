interface IReviewRequest {
  user_id: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  review_title: string;
  review_content: string;
}

interface IReviewResponse extends IReviewRequest {
  createdAt: Date;
}