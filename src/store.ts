import {
  configureStore,
  ConfigureStoreOptions,
  combineReducers,
} from "@reduxjs/toolkit";
import { ProductRepository } from "./cart/domain/product.repository";
import { cartSlice } from "./cart/usecases/cart.slice";
import { GetProductList } from "./cart/usecases/product-list.query";
import { productSlice } from "./cart/usecases/product.slice";

export type ThunkExtraArg = {
  productRepository: ProductRepository;
  getProductList: GetProductList;
};

export const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [productSlice.name]: productSlice.reducer,
});

export const createStore = ({
  preloadedState,
  productRepository,
  getProductList,
}: {
  preloadedState?: ConfigureStoreOptions["preloadedState"];
} & ThunkExtraArg) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: {
            productRepository,
            getProductList,
          },
        },
      });
    },
    preloadedState,
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
