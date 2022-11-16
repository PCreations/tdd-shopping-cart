import { Cart } from "../domain/cart";
import { CartStore } from "../domain/cart.store";

export class InMemoryCartStore implements CartStore {
  cart = Cart.initialize();
  updateListeners = new Array<() => void>();

  setCart(cart: Cart): void {
    this.cart = cart;
    this.updateListeners.forEach((listener) => listener());
  }

  selectCart(): Cart {
    return Cart.fromData(this.cart.data);
  }

  onUpdate(listener: () => void): void {
    this.updateListeners.push(listener);
  }
}
