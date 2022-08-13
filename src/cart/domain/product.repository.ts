import { Product } from "./product";

export interface ProductRepository {
  getById(productId: string): Promise<Product | undefined>;
}
