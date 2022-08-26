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
}
