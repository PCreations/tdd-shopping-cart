import { ProductItem } from "./product-item";

export class ProductItemList {
  constructor(private readonly items: Map<string, ProductItem>) {}

  static fromState(state: ProductItemList["state"]) {
    const productItems = state.map(ProductItem.fromState);

    return new ProductItemList(
      new Map(productItems.map((i) => [i.productId, i]))
    );
  }

  get state() {
    return [...this.items.values()].map((i) => i.state);
  }

  addProductItem(productItem: ProductItem) {
    const existingProductItem = this.items.get(productItem.productId);
    if (existingProductItem) {
      existingProductItem.increaseQuantity();

      return;
    }
    this.items.set(productItem.productId, productItem);
  }
}
