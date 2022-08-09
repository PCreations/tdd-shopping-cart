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
  let addedProductId: string;
  let existingProduct: { id: string; price: number };
  let theCart: {
    products: { id: string; quantity: number; price: number }[];
    total: number;
  };
  return {
    givenCart(cart: { products: []; total: number }) {
      theCart = cart;
    },
    givenExistingProduct(product: { id: string; price: number }) {
      existingProduct = product;
    },
    async whenAddingProductInCart(addProductInCartRequest: {
      productId: string;
    }) {
      addedProductId = addProductInCartRequest.productId;
    },
    thenCartShouldBe(expectedCart: {
      products: { id: string; quantity: number; price: number }[];
      total: number;
    }) {
      const cart = {
        products: [
          {
            id: existingProduct.id,
            quantity: 1,
            price: existingProduct.price,
          },
        ],
        total: 2.5,
      };
      expect(cart).toEqual(expectedCart);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
