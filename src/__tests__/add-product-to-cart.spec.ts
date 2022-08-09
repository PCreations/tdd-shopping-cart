describe("Feature: Adding a product to the cart", () => {
  let sut: Sut;

  beforeEach(() => {
    sut = createSut();
  });
  describe("Rule: Should add a quantity of one product when adding a product", () => {
    test('Example: Adding "mustard" at 2.5€ in the cart', async () => {
      sut.givenExistingProduct({
        id: "mustard",
        price: 2.5,
      });
      sut.givenCart({
        products: [],
        total: 0,
      });

      await sut.whenAddingProductInCart({
        productId: "mustard",
      });

      sut.thenCartShouldBe({
        products: [
          {
            id: "mustard",
            quantity: 1,
            price: 2.5,
          },
        ],
        total: 2.5,
      });
    });
  });
});

const createSut = () => {
  return {
    givenExistingProduct(product: { id: string; price: number }) {},
    async whenAddingProductInCart(addProductInCartRequest: {
      productId: string;
    }) {},
    givenCart(cart: { products: []; total: number }) {},
    thenCartShouldBe(expectedCart: {
      products: { id: string; quantity: number; price: number }[];
      total: number;
    }) {},
  };
};

type Sut = ReturnType<typeof createSut>;
