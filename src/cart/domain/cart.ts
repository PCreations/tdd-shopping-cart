import { Product } from "./product";
import { ProductItem } from "./product-item";
import { ProductItemList } from "./product-item-list";

export class Cart {
  constructor(
    private readonly products: ProductItemList,
    private total: number
  ) {}

  static fromState(state: Cart["state"]) {
    return new Cart(ProductItemList.fromState(state.products), state.total);
  }

  get state() {
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
