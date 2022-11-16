import { InMemoryCatalogStore } from "../catalog/infra/inmemory.catalog.store";
import { GetProductListUseCase } from "../catalog/usecases/get-product-list.usecase";
import { StubCatalogGateway } from "./stub.catalog.gateway";

describe("Feature: Retrieving products list", () => {
  let sut: Sut;

  beforeEach(() => {
    sut = createSut();
  });

  test("Products contains name, price and short description", async () => {
    sut.givenFollowingProductList([
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
        description: "Ketchup with bio tomatoes",
      },
    ]);

    const waitingForProducts = sut.whenRetrievingProductList();

    sut.thenProductListShouldBeLoading();
    await waitingForProducts;
    sut.thenProductListShouldBe([
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
        description: "Ketchup with bio tomatoes",
      },
    ]);
    sut.thenProductListShouldNotBeLoading();
  });
});

const createSut = () => {
  const catalogStore = new InMemoryCatalogStore();
  const catalogGateway = new StubCatalogGateway();
  const getProductListUseCase = new GetProductListUseCase(
    catalogGateway,
    catalogStore
  );
  return {
    givenFollowingProductList(
      productList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      catalogGateway.willReturnProductList = productList;
    },
    async whenRetrievingProductList() {
      return getProductListUseCase.handle();
    },
    thenProductListShouldBeLoading() {
      expect(catalogStore.areProductsLoading()).toBe(true);
    },
    thenProductListShouldNotBeLoading() {
      expect(catalogStore.areProductsLoading()).toBe(false);
    },
    thenProductListShouldBe(
      expectedProductList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      const productList = catalogStore.selectProducts();
      expect(productList).toEqual(expectedProductList);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
