import { createFakeGetProductList } from "../cart/infra/fake-get-product-list";
import {
  ProductList,
  getProductList,
} from "../cart/usecases/product-list.query";
import { selectProductList } from "../cart/usecases/product.slice";
import { AppStore } from "../store";
import { storeBuilder } from "./builders/store.builder";

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

    await sut.whenRetrievingProductList();

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
  });
});

const createSut = () => {
  let store: AppStore;
  return {
    givenFollowingProductList(
      productList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      const getProductList = createFakeGetProductList(
        new ProductList(productList)
      );
      store = storeBuilder().withGetProductList(getProductList).build();
    },
    async whenRetrievingProductList() {
      return store.dispatch(getProductList());
    },
    thenProductListShouldBe(
      expectedProductList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      const retrievedProductList = selectProductList(store.getState());
      expect(retrievedProductList).toEqual(
        new ProductList(expectedProductList)
      );
    },
  };
};

type Sut = ReturnType<typeof createSut>;
