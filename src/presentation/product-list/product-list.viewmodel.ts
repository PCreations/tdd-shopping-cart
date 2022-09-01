import {
  AddProductCartRequest,
  addProductToCart,
} from "../../cart/usecases/add-product-to-cart.usecase";
import { getProductList } from "../../cart/usecases/product-list.query";
import {
  selectIsProductListLoading,
  selectProductList,
} from "../../cart/usecases/product.slice";
import { AppDispatch, RootState } from "../../store";

export class ProductListViewModel {
  selector(state: RootState) {
    const loading = selectIsProductListLoading(state);
    const productList = selectProductList(state);

    return {
      loading,
      products: productList.products.map((p) => ({
        ...p,
        price: `${p.price}€`,
      })),
    };
  }

  getProductList(dispatch: AppDispatch) {
    return dispatch(getProductList());
  }

  addProductToCart(
    dispatch: AppDispatch,
    { productId }: { productId: string }
  ) {
    return dispatch(addProductToCart(new AddProductCartRequest(productId)));
  }
}
