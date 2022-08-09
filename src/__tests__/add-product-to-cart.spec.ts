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
  let theCart: {
    products: { id: string; quantity: number; price: number }[];
    total: number;
  };
  let productsById = new Map<string, { id: string; price: number }>();
  return {
    givenCart(cart: { products: []; total: number }) {
      theCart = cart;
    },
    givenExistingProduct(product: { id: string; price: number }) {
      productsById.set(product.id, product);
    },
    async whenAddingProductInCart(addProductInCartRequest: {
      productId: string;
    }) {
      const product = productsById.get(addProductInCartRequest.productId);
      theCart.products.push({
        ...product!,
        quantity: 1,
      });
    },
    thenCartShouldBe(expectedCart: {
      products: { id: string; quantity: number; price: number }[];
      total: number;
    }) {
      const cart = {
        ...theCart,
        total: 2.5,
      };
      expect(cart).toEqual(expectedCart);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
