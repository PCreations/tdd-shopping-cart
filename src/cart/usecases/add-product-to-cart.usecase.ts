import { Cart } from "../domain/cart";
import { Product } from "../domain/product";
import { ProductItem } from "../domain/product-item";

export class AddProductCartRequest {
  constructor(readonly productId: string) {}
}

export class AddProductToCart {
  constructor(
    private readonly getCart: () => Cart,
    private readonly getProductById: (productId: string) => Product | undefined
  ) {}

  handle(addProductInCartRequest: AddProductCartRequest) {
    const product = this.getProductById(addProductInCartRequest.productId);
    this.getCart().products.push(
      new ProductItem(product!.id, 1, product!.price)
    );
  }
}
