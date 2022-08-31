import { createFakeGetProductList } from "../cart/infra/fake-get-product-list";
import {
  ProductList,
  GetProductList,
  ProductListQuery,
} from "../cart/usecases/product-list.query";

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
        description: "Ketchup with bio tomatos",
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
        description: "Ketchup with bio tomatos",
      },
    ]);
  });
});

const createSut = () => {
  let getProductList: GetProductList;
  let retrievedProductList: ProductList;
  return {
    givenFollowingProductList(
      productList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      getProductList = createFakeGetProductList(new ProductList(productList));
    },
    async whenRetrievingProductList() {
      const productListQuery = new ProductListQuery(getProductList);
      retrievedProductList = await productListQuery.execute();
    },
    thenProductListShouldBe(
      expectedProductList: {
        id: string;
        price: number;
        description: string;
        name: string;
      }[]
    ) {
      expect(retrievedProductList).toEqual(
        new ProductList(expectedProductList)
      );
    },
  };
};

type Sut = ReturnType<typeof createSut>;
