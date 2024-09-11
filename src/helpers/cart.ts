import { ICart, ICartItem } from "../interfaces/cart";

export const mapCartDocumentToResponse = (cart: any): ICart => {
  return {
    user_id: cart.user_id?.toString() || "",
    items: cart.items?.map((rp: ICartItem) => rp),
    price: cart.price,
    total: cart.total,
  };
};
