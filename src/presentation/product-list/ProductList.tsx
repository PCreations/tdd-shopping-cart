import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ProductListViewModel } from "./product-list.viewmodel";

export const ProductList = ({
  productListViewModel,
}: {
  productListViewModel: ProductListViewModel;
}) => {
  const productListState = useSelector(productListViewModel.selector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    productListViewModel.getProductList(dispatch);
  }, [productListViewModel, dispatch]);

  if (productListState.loading) {
    return <p>Loading...</p>;
  }

  const addToCart = (productId: string) => () =>
    productListViewModel.addProductToCart(dispatch, { productId });

  return (
    <div>
      <ul>
        {productListState.products.map((p) => (
          <li key={p.id}>
            <strong>
              {p.name} - {p.price}
            </strong>
            <span style={{ marginLeft: 5, marginRight: 5 }}>
              {p.description}
            </span>
            <button onClick={addToCart(p.id)}>add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
