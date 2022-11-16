import { InMemoryCartStore } from "./cart/infra/inmemory.cart.store";
import { AddProductToCartUseCase } from "./cart/usecases/add-product-to-cart.usecase";
import { InMemoryCatalogStore } from "./catalog/infra/inmemory.catalog.store";
import { GetProductListUseCase } from "./catalog/usecases/get-product-list.usecase";
import { Cart } from "./presentation/cart/Cart";
import { CartViewModel } from "./presentation/cart/cart.viewmodel";
import { ProductListViewModel } from "./presentation/product-list/product-list.viewmodel";
import { ProductList } from "./presentation/product-list/ProductList";
import { StubCatalogGateway } from "./__tests__/stub.catalog.gateway";

const productList = [
  {
    id: "mustard",
    price: 2.5,
    name: "Mustard",
    description: "Best Mustard In Town !",
  },
  {
    id: "ketchup",
    price: 2,
    name: "Ketchup",
    description: "Ketchup made with great tomatoes",
  },
];

const catalogGateway = new StubCatalogGateway();
catalogGateway.willReturnProductList = productList;
catalogGateway.delayInMs = 1000;
const catalogStore = new InMemoryCatalogStore();
const cartStore = new InMemoryCartStore();
const getProductListUseCase = new GetProductListUseCase(
  catalogGateway,
  catalogStore
);
const addProductToCartUseCase = new AddProductToCartUseCase(cartStore);

const productListViewModel = new ProductListViewModel(
  catalogStore,
  getProductListUseCase,
  addProductToCartUseCase
);
const cartViewModel = new CartViewModel(catalogStore, cartStore);

const App = () => {
  return (
    <div className="App">
      <h1>Product List</h1>
      <ProductList productListViewModel={productListViewModel} />
      <Cart cartViewModel={cartViewModel} />
    </div>
  );
};

export default App;
