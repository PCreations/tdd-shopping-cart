import { ProductList, GetProductList } from "../usecases/product-list.query";

export const createFakeGetProductList =
  (
    willReturnProductList: ProductList,
    { delay = 0 }: { delay?: number } = {}
  ): GetProductList =>
  () => {
    return new Promise((resolve) => {
      if (delay === 0) {
        resolve(willReturnProductList);
        return;
      }
      setTimeout(() => resolve(willReturnProductList), delay);
    });
  };
