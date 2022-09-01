import { Product } from "./product";
import { ProductItem } from "./product-item";
import { ProductItemList, ProductItemListState } from "./product-item-list";

export type CartState = {
  products: ProductItemListState;
  total: number;
};

export class Cart {
  constructor(
    private readonly products: ProductItemList,
    private total: number
  ) {}

  static fromState(state: CartState) {
    return new Cart(ProductItemList.fromState(state.products), state.total);
  }

  get state(): CartState {
    return {
      products: this.products.state,
      total: this.total,
    };
  }

  addProduct(product: Product) {
    this.products.addProductItem(ProductItem.ofProduct(product));

    this.total += product.price;
  }
}
