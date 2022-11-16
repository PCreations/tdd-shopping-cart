import { CatalogGateway } from "../domain/catalog.gateway";
import { CatalogStore } from "../domain/catalog.store";

export class GetProductListUseCase {
  constructor(
    private readonly catalogGateway: CatalogGateway,
    private readonly catalogStore: CatalogStore
  ) {}

  async handle() {
    this.catalogStore.setProductsLoading(true);
    const products = await this.catalogGateway.getProductList();
    this.catalogStore.addMany(products);
    this.catalogStore.setProductsLoading(false);
  }
}
