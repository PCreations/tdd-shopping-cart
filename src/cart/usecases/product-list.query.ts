export class ProductList {
  constructor(
    readonly products: {
      id: string;
      price: number;
      name: string;
      description: string;
    }[]
  ) {}
}

export type GetProductList = {
  (): Promise<ProductList>;
};

export class ProductListQuery {
  constructor(private readonly getProductList: GetProductList) {}

  execute() {
    return this.getProductList();
  }
}
