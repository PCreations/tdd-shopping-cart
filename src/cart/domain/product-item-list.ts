import { ProductItem, ProductItemData } from "./product-item";

export type ProductItemListData = ProductItemData[];

export class ProductItemList {
  constructor(private readonly items: Map<string, ProductItem>) {}

  static fromData(data: ProductItemListData) {
    const productItems = data.map(ProductItem.fromData);

    return new ProductItemList(
      new Map(productItems.map((i) => [i.productId, i]))
    );
  }

  get data(): ProductItemListData {
    return [...this.items.values()].map((i) => i.data);
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
