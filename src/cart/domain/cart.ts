import { Product } from "./product";
import { ProductItem } from "./product-item";

export class Cart {
  constructor(readonly products: ProductItem[], readonly total: number) {}

  static fromState(state: Cart["state"]) {
    return new Cart(state.products.map(ProductItem.fromState), state.total);
  }

  get state() {
    return {
      products: this.products.map((p) => p.state),
      total: this.total,
    };
  }

  addProduct(product: Product) {
    const existingProductIndex = this.products.findIndex(
      (p) => p.productId === product!.id
    );
    if (existingProductIndex !== -1) {
      const existingProductItem = this.products.splice(
        existingProductIndex,
        1
      )[0];
      this.products.push(
        new ProductItem(
          existingProductItem.productId,
          existingProductItem.quantity + 1,
          existingProductItem.price
        )
      );
    } else {
      this.products.push(new ProductItem(product!.id, 1, product!.price));
    }

    return new Cart(this.products, this.total + product.price);
  }
}
