import { Store } from "../../shared/store";
import { Product } from "./product";

export interface CatalogStore extends Store {
  addMany(products: Product[]): void;
  selectProducts(): Product[];
  setProductsLoading(loading: boolean): void;
  areProductsLoading(): boolean;
  selectProductById(productId: string): Product | undefined;
}
