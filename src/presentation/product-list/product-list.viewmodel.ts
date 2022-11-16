import { AddProductToCartUseCase } from "../../cart/usecases/add-product-to-cart.usecase";
import { CatalogStore } from "../../catalog/domain/catalog.store";
import { GetProductListUseCase } from "../../catalog/usecases/get-product-list.usecase";
import { ViewModel } from "../view-model";

export type ProductListViewData = {
  loading: boolean;
  products: {
    id: string;
    price: string;
    priceNumber: number;
    name: string;
    description: string;
  }[];
};

export class ProductListViewModel extends ViewModel<ProductListViewData> {
  constructor(
    private readonly catalogStore: CatalogStore,
    private readonly getProductListUseCase: GetProductListUseCase,
    private readonly addProductToCartUseCase: AddProductToCartUseCase
  ) {
    super([catalogStore]);
  }

  protected selector(): ProductListViewData {
    const loading = this.catalogStore.areProductsLoading();
    const products = this.catalogStore.selectProducts();

    return {
      loading,
      products: products.map((p) => ({
        ...p,
        price: `${p.price}€`,
        priceNumber: p.price,
      })),
    };
  }

  getProductList() {
    return this.getProductListUseCase.handle();
  }

  addProductToCart({ productId, price }: { productId: string; price: number }) {
    return this.addProductToCartUseCase.handle({ productId, price });
  }
}
