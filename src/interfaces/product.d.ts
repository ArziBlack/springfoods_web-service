interface IDimensions {
  height: number;
  width: number;
  depth: number;
}

interface IProductRequest {
  category_id: string;
  category: Types.ObjectId;
  name: string;
  featured: boolean;
  price: number;
  discount?: number;
  final_price: number;
  sku: string;
  stock: number;
  product_image: string;
  description: string;
  weight: number;
  dimensions: IDimensions;
  sizes: string[];
  is_available?: boolean;
  tags: string[];
  vendor_id: string;
}

interface IProductResponse {
  _id: string;
  category_id?: string;
  category?: string;
  name: string;
  featured: boolean;
  price: number;
  discount?: number;
  final_price: number;
  sku: string;
  stock: number;
  product_image: string;
  description: string;
  weight: number;
  dimensions: IDimensions;
  sizes: string[];
  reviews?: IReviewResponse[];
  average_rating?: number;
  total_reviews?: number;
  is_available?: boolean;
  tags: string[];
  related_products?: string;
  vendor_id: string;
}
