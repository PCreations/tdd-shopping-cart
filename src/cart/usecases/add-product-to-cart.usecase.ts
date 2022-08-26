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
    cart.products.push(new ProductItem(product!.id, 1, product!.price));

    this.cartRepository.save(
      new Cart(
        cart.products,
        cart.products.reduce((total, p) => total + p.price, 0)
      )
    );
  }
}
