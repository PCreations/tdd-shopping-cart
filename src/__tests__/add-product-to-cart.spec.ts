import { Cart } from "../cart/domain/cart";
import { InMemoryCartStore } from "../cart/infra/inmemory.cart.store";
import {
  AddProductCartRequest,
  AddProductToCartUseCase,
} from "../cart/usecases/add-product-to-cart.usecase";
import { cartBuilder } from "./builders/cart.builder";

describe("Feature: Adding a product to the cart", () => {
  let sut: Sut;

  beforeEach(() => {
    sut = createSut();
  });
  describe("Rule: Should add a quantity of one product when adding a product", () => {
    test('Example: Adding "mustard" at 2.5€ in the cart', async () => {
      sut.givenCart(cartBuilder().empty().build());

      await sut.whenAddingProductInCart({
        productId: "mustard",
        price: 2.5,
      });

      sut.thenCartShouldBe(
        cartBuilder()
          .withProducts([
            {
              productId: "mustard",
              quantity: 1,
              price: 2.5,
            },
          ])
          .withTotal(2.5)
          .build()
      );
    });

    test('Example: Adding a "ketchup" at 2€ in the cart already containing one "mustard" at 2.5€', async () => {
      sut.givenCart(
        cartBuilder()
          .withProducts([
            {
              productId: "mustard",
              quantity: 1,
              price: 2.5,
            },
          ])
          .withTotal(2.5)
          .build()
      );

      await sut.whenAddingProductInCart({
        productId: "ketchup",
        price: 2,
      });

      sut.thenCartShouldBe(
        cartBuilder()
          .withProducts([
            {
              productId: "mustard",
              quantity: 1,
              price: 2.5,
            },
            {
              productId: "ketchup",
              quantity: 1,
              price: 2,
            },
          ])
          .withTotal(4.5)
          .build()
      );
    });

    test('Example: Adding a second "ketchup" at 2€ in the cart already containing one "mustard" at 2.5€ and one "ketchup" at 2€', async () => {
      sut.givenCart(
        cartBuilder()
          .withProducts([
            {
              productId: "mustard",
              quantity: 1,
              price: 2.5,
            },
            {
              productId: "ketchup",
              quantity: 1,
              price: 2,
            },
          ])
          .withTotal(4.5)
          .build()
      );

      await sut.whenAddingProductInCart({
        productId: "ketchup",
        price: 2,
      });

      sut.thenCartShouldBe(
        cartBuilder()
          .withProducts([
            {
              productId: "mustard",
              quantity: 1,
              price: 2.5,
            },
            {
              productId: "ketchup",
              quantity: 2,
              price: 2,
            },
          ])
          .withTotal(6.5)
          .build()
      );
    });
  });
});

const createSut = () => {
  const cartStore = new InMemoryCartStore();
  const addProductToCartUseCase = new AddProductToCartUseCase(cartStore);
  return {
    givenCart(cart: Cart) {
      cartStore.setCart(cart);
    },
    async whenAddingProductInCart(
      addProductInCartRequest: AddProductCartRequest
    ) {
      return addProductToCartUseCase.handle(addProductInCartRequest);
    },
    thenCartShouldBe(expectedCart: Cart) {
      const cart = cartStore.selectCart();
      expect(cart).toEqual(expectedCart);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
