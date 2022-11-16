import { CartStore } from "../domain/cart.store";
import { ProductItem } from "../domain/product-item";

export type AddProductCartRequest = {
  productId: string;
  price: number;
};

export class AddProductToCartUseCase {
  constructor(private readonly cartStore: CartStore) {}

  handle(request: AddProductCartRequest) {
    const cart = this.cartStore.selectCart();
    const productItem = ProductItem.fromData({
      productId: request.productId,
      price: request.price,
      quantity: 1,
    });

    cart.addProductItem(productItem);

    this.cartStore.setCart(cart);
  }
}
