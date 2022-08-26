export class ProductItem {
  constructor(
    readonly productId: string,
    readonly quantity: number,
    readonly price: number
  ) {}

  static fromState(state: ProductItem["state"]) {
    return new ProductItem(state.productId, state.quantity, state.price);
  }

  get state() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
