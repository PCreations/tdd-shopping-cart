import { Cart } from "./cart";

export interface CartRepository {
  getCart(): Cart;
  save(cart: Cart): void;
}
