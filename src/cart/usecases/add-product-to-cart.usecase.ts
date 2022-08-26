import { Cart } from "../domain/cart";
import { CartRepository } from "../domain/cart.repository";
import { ProductItem } from "../domain/product-item";
import { ProductRepository } from "../domain/product.repository";

export class AddProductCartRequest {
  constructor(readonly productId: string) {}
}

export class AddProductToCart {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async handle(addProductInCartRequest: AddProductCartRequest) {
    const product = await this.productRepository.getById(
      addProductInCartRequest.productId
    );
    const cart = this.cartRepository.getCart();

    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId === product!.id
    );

    if (existingProductIndex !== -1) {
      const existingProductItem = cart.products.splice(
        existingProductIndex,
        1
      )[0];
      cart.products.push(
        new ProductItem(
          existingProductItem.productId,
          existingProductItem.quantity + 1,
          existingProductItem.price
        )
      );
    } else {
      cart.products.push(new ProductItem(product!.id, 1, product!.price));
    }

    this.cartRepository.save(
      new Cart(
        cart.products,
        cart.products.reduce((total, p) => total + p.price * p.quantity, 0)
      )
    );
  }
}
