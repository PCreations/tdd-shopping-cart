export class Product {
  constructor(readonly id: string, readonly price: number) {}

  static fromState(state: Product["state"]) {
    return new Product(state.id, state.price);
  }

  get state() {
    return {
      id: this.id,
      price: this.price,
    };
  }
}
