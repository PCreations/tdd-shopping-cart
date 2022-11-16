import { useEffect, useState } from "react";
import {
  ProductListViewData,
  ProductListViewModel,
} from "./product-list.viewmodel";

export const ProductList = ({
  productListViewModel,
}: {
  productListViewModel: ProductListViewModel;
}) => {
  const [productListState, setProductListState] =
    useState<ProductListViewData>();

  useEffect(
    () => productListViewModel.subscribe((data) => setProductListState(data)),
    [productListViewModel]
  );

  useEffect(() => {
    productListViewModel.getProductList();
  }, [productListViewModel]);

  if (productListState?.loading) {
    return <p>Loading...</p>;
  }

  const addToCart = (productId: string, price: number) => () =>
    productListViewModel.addProductToCart({ productId, price });

  return (
    <div>
      <ul>
        {productListState?.products.map((p) => (
          <li key={p.id}>
            <strong>
              {p.name} - {p.price}
            </strong>
            <span style={{ marginLeft: 5, marginRight: 5 }}>
              {p.description}
            </span>
            <button onClick={addToCart(p.id, p.priceNumber)}>
              add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
