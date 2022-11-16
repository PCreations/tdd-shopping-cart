import { Product } from "./product";

export interface CatalogGateway {
  getProductList(): Promise<Product[]>;
}
