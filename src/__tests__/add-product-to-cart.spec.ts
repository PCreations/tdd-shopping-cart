import { Cart } from "../cart/domain/cart";
import { Product } from "../cart/domain/product";
import {
  AddProductCartRequest,
  AddProductToCart,
} from "../cart/usecases/add-product-to-cart.usecase";

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
            productId: "mustard",
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
  let theCart: Cart;
  let productsById = new Map<string, Product>();
  const addProductToCart = new AddProductToCart(
    () => theCart,
    (productId: string) => productsById.get(productId)
  );
  return {
    givenCart(cart: Cart) {
      theCart = cart;
    },
    givenExistingProduct(product: Product) {
      productsById.set(product.id, product);
    },
    async whenAddingProductInCart(
      addProductInCartRequest: AddProductCartRequest
    ) {
      addProductToCart.handle(addProductInCartRequest);
    },
    thenCartShouldBe(expectedCart: Cart) {
      const cart = new Cart(theCart.products, 2.5);
      expect(cart).toEqual(expectedCart);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
