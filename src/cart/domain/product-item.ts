export type ProductItemData = {
  productId: string;
  quantity: number;
  price: number;
};

export class ProductItem {
  constructor(
    readonly productId: string,
    private quantity: number,
    private readonly _price: number
  ) {}

  static fromData(data: ProductItemData) {
    return new ProductItem(data.productId, data.quantity, data.price);
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  get price() {
    return this._price;
  }

  get data(): ProductItemData {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
