import { AddProductToCartUseCase } from "../../../cart/usecases/add-product-to-cart.usecase";
import { CatalogStore } from "../../../catalog/domain/catalog.store";
import { InMemoryCatalogStore } from "../../../catalog/infra/inmemory.catalog.store";
import { GetProductListUseCase } from "../../../catalog/usecases/get-product-list.usecase";
import { ProductListViewModel } from "../product-list.viewmodel";

describe("ProductListViewModel", () => {
  const productList = [
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
  ];
  let catalogStore: CatalogStore;
  const getProductListUseCase = {
    handle: jest.fn(),
  } as unknown as GetProductListUseCase;
  const addProductToCartUseCase = {
    handle: jest.fn(),
  } as unknown as AddProductToCartUseCase;
  beforeEach(() => {
    jest.resetAllMocks();
    catalogStore = new InMemoryCatalogStore();
  });
  test("data while loading", (done) => {
    catalogStore.setProductsLoading(true);
    const productListViewModel = new ProductListViewModel(
      catalogStore,
      getProductListUseCase,
      addProductToCartUseCase
    );
    productListViewModel.subscribe((data) => {
      try {
        expect(data).toEqual({
          loading: true,
          products: [],
        });
      } finally {
        done();
      }
    });
  });

  test("data once loaded", (done) => {
    catalogStore.setProductsLoading(false);
    catalogStore.addMany(productList);
    const productListViewModel = new ProductListViewModel(
      catalogStore,
      getProductListUseCase,
      addProductToCartUseCase
    );
    productListViewModel.subscribe((data) => {
      try {
        expect(data).toEqual({
          loading: false,
          products: [
            {
              id: "mustard",
              price: "2.5€",
              priceNumber: 2.5,
              name: "Mustard",
              description: "Best mustard in town",
            },
            {
              id: "ketchup",
              price: "2€",
              priceNumber: 2,
              name: "Ketchup",
              description: "Ketchup with bio tomatos",
            },
          ],
        });
      } finally {
        done();
      }
    });
  });

  test("getProductList", () => {
    const productListViewModel = new ProductListViewModel(
      catalogStore,
      getProductListUseCase,
      addProductToCartUseCase
    );

    productListViewModel.getProductList();

    expect(getProductListUseCase.handle).toHaveBeenCalledWith();
  });

  test("addProductToCart", () => {
    const productListViewModel = new ProductListViewModel(
      catalogStore,
      getProductListUseCase,
      addProductToCartUseCase
    );

    productListViewModel.addProductToCart({
      productId: "mustard-id",
      price: 2.5,
    });

    expect(addProductToCartUseCase.handle).toHaveBeenCalledWith({
      productId: "mustard-id",
      price: 2.5,
    });
  });
});
