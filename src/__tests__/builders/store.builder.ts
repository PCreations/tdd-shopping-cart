import { produce } from "immer";
import { Cart } from "../../cart/domain/cart";
import { createFakeGetProductList } from "../../cart/infra/fake-get-product-list";
import { FakeProductRepository } from "../../cart/infra/fake-product.repository";
import {
  GetProductList,
  ProductList,
} from "../../cart/usecases/product-list.query";
import { productsAdapter } from "../../cart/usecases/product.slice";
import {
  createStore,
  rootReducer,
  RootState,
  ThunkExtraArg,
} from "../../store";

export const storeBuilder = (
  state: RootState = rootReducer(undefined, { type: "" }),
  {
    productRepository = new FakeProductRepository(),
    getProductList = createFakeGetProductList(new ProductList([])),
  }: Partial<ThunkExtraArg> = {}
) => {
  const storeDependencies = { productRepository, getProductList };

  return {
    withCart(_cart: Cart) {
      const newState = produce(state, (draft) => {
        draft.cart = _cart.state;
      });

      return storeBuilder(newState, storeDependencies);
    },
    withFetchedProducts(products: ProductList["state"]["products"]) {
      const newState = produce(state, (draft) => {
        draft.products = {
          ...productsAdapter.addMany(state.products, products),
          loading: false,
        };
      });

      return storeBuilder(newState, storeDependencies);
    },
    withProductRepository(
      _productRepository: ThunkExtraArg["productRepository"]
    ) {
      return storeBuilder(state, {
        ...storeDependencies,
        productRepository: _productRepository,
      });
    },
    withGetProductList(_getProductList: GetProductList) {
      return storeBuilder(state, {
        ...storeDependencies,
        getProductList: _getProductList,
      });
    },
    build() {
      return createStore({
        preloadedState: state,
        productRepository,
        getProductList,
      });
    },
  };
};
