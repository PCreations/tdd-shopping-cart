export class AddProductToCart {
  constructor(
    private readonly getCart: () => {
      products: { id: string; quantity: number; price: number }[];
      total: number;
    },
    private readonly getProductById: (productId: string) =>
      | {
          id: string;
          price: number;
        }
      | undefined
  ) {}

  handle(addProductInCartRequest: { productId: string }) {
    const product = this.getProductById(addProductInCartRequest.productId);
    this.getCart().products.push({
      ...product!,
      quantity: 1,
    });
  }
}
