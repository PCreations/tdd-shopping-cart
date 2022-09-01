import { Product } from "./product";

export type ProductItemState = {
  productId: string;
  quantity: number;
  price: number;
};

export class ProductItem {
  constructor(
    readonly productId: string,
    private quantity: number,
    private readonly price: number
  ) {}

  static fromState(state: ProductItemState) {
    return new ProductItem(state.productId, state.quantity, state.price);
  }

  static ofProduct(product: Product) {
    return new ProductItem(product.id, 1, product.price);
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  get state(): ProductItemState {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
