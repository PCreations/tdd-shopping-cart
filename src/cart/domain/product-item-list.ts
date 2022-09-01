import { ProductItem, ProductItemState } from "./product-item";

export type ProductItemListState = ProductItemState[];

export class ProductItemList {
  constructor(private readonly items: Map<string, ProductItem>) {}

  static fromState(state: ProductItemListState) {
    const productItems = state.map(ProductItem.fromState);

    return new ProductItemList(
      new Map(productItems.map((i) => [i.productId, i]))
    );
  }

  get state(): ProductItemListState {
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
