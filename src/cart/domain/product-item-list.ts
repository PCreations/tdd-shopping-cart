import { ProductItem } from "./product-item";

export class ProductItemList {
  constructor(readonly items: ProductItem[]) {}

  static fromState(state: ProductItemList["state"]) {
    return new ProductItemList(state.map(ProductItem.fromState));
  }

  get state() {
    return this.items.map((i) => i.state);
  }

  addProductItem(productItem: ProductItem) {
    const existingProductIndex = this.items.findIndex(
      (p) => p.productId === productItem.productId
    );
    if (existingProductIndex !== -1) {
      const existingProductItem = this.items.splice(existingProductIndex, 1)[0];
      this.items.push(
        new ProductItem(
          existingProductItem.productId,
          existingProductItem.quantity + 1,
          existingProductItem.price
        )
      );
    } else {
      this.items.push(productItem);
    }
  }
}
