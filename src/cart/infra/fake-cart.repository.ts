import { Cart } from "../domain/cart";
import { CartRepository } from "../domain/cart.repository";

export class FakeCartRepository implements CartRepository {
  private currentCart!: Cart;

  getCart(): Cart {
    return this.currentCart;
  }

  save(cart: Cart) {
    this.currentCart = cart;
  }

  givenCurrentCartIs(currentCart: Cart) {
    this.save(currentCart);
  }
}
