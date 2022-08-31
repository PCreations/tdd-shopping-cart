import { ProductList } from "../domain/product-list";
import { GetProductList } from "../usecases/product-list.query";

export const createFakeGetProductList =
  (willReturnProductList: ProductList): GetProductList =>
  () =>
    Promise.resolve(willReturnProductList);
