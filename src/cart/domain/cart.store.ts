import { Store } from "../../shared/store";
import { Cart } from "./cart";

export interface CartStore extends Store {
  setCart(cart: Cart): void;
  selectCart(): Cart;
}
