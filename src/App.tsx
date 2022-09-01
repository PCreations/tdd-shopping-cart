import { Provider } from "react-redux";
import { Product } from "./cart/domain/product";
import { createFakeGetProductList } from "./cart/infra/fake-get-product-list";
import { FakeProductRepository } from "./cart/infra/fake-product.repository";
import { ProductList as ProductListData } from "./cart/usecases/product-list.query";
import { Cart } from "./presentation/cart/Cart";
import { CartViewModel } from "./presentation/cart/cart.viewmodel";
import { ProductListViewModel } from "./presentation/product-list/product-list.viewmodel";
import { ProductList } from "./presentation/product-list/ProductList";
import { createStore } from "./store";

const productRepository = new FakeProductRepository();
const mustard = Product.fromState({
  id: "mustard",
  price: 2.5,
});
const ketchup = Product.fromState({
  id: "ketchup",
  price: 2,
});
productRepository.givenExistingProduct(mustard);
productRepository.givenExistingProduct(ketchup);
const productList = new ProductListData([
  {
    ...mustard.state,
    name: "Mustard",
    description: "Best Mustard In Town !",
  },
  {
    ...ketchup.state,
    name: "Ketchup",
    description: "Ketchup made with great tomatoes",
  },
]);

const store = createStore({
  productRepository,
  getProductList: createFakeGetProductList(productList, { delay: 1000 }),
});

const productListViewModel = new ProductListViewModel();
const cartViewModel = new CartViewModel();

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Product List</h1>
        <ProductList productListViewModel={productListViewModel} />
        <Cart cartViewModel={cartViewModel} />
      </div>
    </Provider>
  );
};

export default App;
