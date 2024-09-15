// import { ICart, ICartItem } from "../interfaces/cart";

// // type ICartResponse = Omit<ICart, '_id' | '$assertPopulated' | '$clearModifiedPaths'>;

// export const mapCartDocumentToResponse = (cart: any): ICartResponse => {
//   return {
//     user_id: cart.user_id?.toString() || "",
//     items: cart.items?.map((rp: ICartItem) => rp),
//     price: cart.price,
//     total: cart.total,
//   };
// };
