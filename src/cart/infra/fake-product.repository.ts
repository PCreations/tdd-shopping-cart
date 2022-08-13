import { Product } from "../domain/product";
import { ProductRepository } from "../domain/product.repository";

export class FakeProductRepository implements ProductRepository {
  private readonly productsById = new Map<string, Product>();

  getById(productId: string): Promise<Product | undefined> {
    return Promise.resolve(this.productsById.get(productId));
  }

  givenExistingProduct(product: Product) {
    this.productsById.set(product.id, product);
  }
}
