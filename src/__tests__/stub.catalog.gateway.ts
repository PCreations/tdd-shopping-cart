import { CatalogGateway } from "../catalog/domain/catalog.gateway";
import { Product } from "../catalog/domain/product";

export class StubCatalogGateway implements CatalogGateway {
  willReturnProductList!: Product[];
  delayInMs = 0;

  getProductList(): Promise<Product[]> {
    if (this.delayInMs === 0) {
      return Promise.resolve(this.willReturnProductList);
    }
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.willReturnProductList), this.delayInMs)
    );
  }
}
