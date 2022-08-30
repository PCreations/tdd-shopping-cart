export class Product {
  constructor(private readonly _id: string, private readonly _price: number) {}

  static fromState(state: Product["state"]) {
    return new Product(state.id, state.price);
  }

  get state() {
    return {
      id: this.id,
      price: this.price,
    };
  }

  get id() {
    return this._id;
  }

  get price() {
    return this._price;
  }
}
