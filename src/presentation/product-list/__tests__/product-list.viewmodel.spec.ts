import { createFakeGetProductList } from "../../../cart/infra/fake-get-product-list";
import {
  AddProductCartRequest,
  addProductToCart,
} from "../../../cart/usecases/add-product-to-cart.usecase";
import { ProductList } from "../../../cart/usecases/product-list.query";
import { storeBuilder } from "../../../__tests__/builders/store.builder";
import { ProductListViewModel } from "../product-list.viewmodel";

jest.mock("../../../cart/usecases/add-product-to-cart.usecase", () => {
  const originalModule = jest.requireActual(
    "../../../cart/usecases/add-product-to-cart.usecase"
  );

  return {
    ...originalModule,
    addProductToCart: jest.fn(),
  };
});

describe("ProductListViewModel", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should loads the product", async () => {
    const productList = new ProductList([
      {
        id: "mustard",
        price: 2.5,
        name: "Mustard",
        description: "Best mustard in town",
      },
      {
        id: "ketchup",
        price: 2,
        name: "Ketchup",
        description: "Ketchup with bio tomatos",
      },
    ]);
    const store = storeBuilder()
      .withGetProductList(createFakeGetProductList(productList))
      .build();
    const productListViewModel = new ProductListViewModel();
    const initialViewModelState = productListViewModel.selector(
      store.getState()
    );
    const getProductListPromise = productListViewModel.getProductList(
      store.dispatch
    );
    const pendingState = productListViewModel.selector(store.getState());

    await getProductListPromise;

    const finalState = productListViewModel.selector(store.getState());
    expect(initialViewModelState).toEqual({
      loading: false,
      products: [],
    });
    expect(pendingState).toEqual({
      loading: true,
      products: [],
    });
    expect(finalState).toEqual({
      loading: false,
      products: [
        {
          id: "mustard",
          price: "2.5€",
          name: "Mustard",
          description: "Best mustard in town",
        },
        {
          id: "ketchup",
          price: "2€",
          name: "Ketchup",
          description: "Ketchup with bio tomatos",
        },
      ],
    });
  });

  it("should add a product to cart", () => {
    const productListViewModel = new ProductListViewModel();
    const dispatch = jest.fn();

    productListViewModel.addProductToCart(dispatch, {
      productId: "mustard-id",
    });

    expect(dispatch).toHaveBeenCalled();
    expect(addProductToCart).toHaveBeenCalledWith(
      new AddProductCartRequest("mustard-id")
    );
  });
});
