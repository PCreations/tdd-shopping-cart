import { ProductItem } from "./product-item";
import { ProductItemList, ProductItemListData } from "./product-item-list";

export type CartData = {
  products: ProductItemListData;
  total: number;
};

export class Cart {
  constructor(
    private readonly products: ProductItemList,
    private total: number
  ) {}

  static fromData(state: CartData) {
    return new Cart(ProductItemList.fromData(state.products), state.total);
  }

  static initialize() {
    return new Cart(ProductItemList.fromData([]), 0);
  }

  get data(): CartData {
    return {
      products: this.products.data,
      total: this.total,
    };
  }

  addProductItem(productItem: ProductItem) {
    this.products.addProductItem(productItem);

    this.total += productItem.price;
  }
}
