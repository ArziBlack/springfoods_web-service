import { Document } from "mongoose";

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

interface Ireview {
  user: string, rating: number, review_title: string, review_content: string
}

interface IProductResponse extends Document {
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
  reviews?: Ireview[];
  average_rating?: number;
  total_reviews?: number;
  is_available?: boolean;
  tags: string[];
  related_products?: Array<string>;
  vendor_id: string;
}
interface IproductResponse {
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
  reviews?: Ireview[];
  average_rating?: number;
  total_reviews?: number;
  is_available?: boolean;
  tags: string[];
  related_products?: Array<string>;
  vendor_id: string;
}
