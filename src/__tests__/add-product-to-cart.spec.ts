import { Cart } from "../cart/domain/cart";
import { Product } from "../cart/domain/product";
import { FakeCartRepository } from "../cart/infra/fake-cart.repository";
import { FakeProductRepository } from "../cart/infra/fake-product.repository";
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
  const cartRepository = new FakeCartRepository();
  const productRepository = new FakeProductRepository();
  const addProductInCart = new AddProductToCart(
    cartRepository,
    productRepository
  );
  return {
    givenCart(cart: Cart) {
      cartRepository.givenCurrentCartIs(cart);
    },
    givenExistingProduct(product: Product) {
      productRepository.givenExistingProduct(product);
    },
    async whenAddingProductInCart(
      addProductInCartRequest: AddProductCartRequest
    ) {
      await addProductInCart.handle(addProductInCartRequest);
    },
    thenCartShouldBe(expectedCart: Cart) {
      const cart = cartRepository.getCart();
      expect(cart).toEqual(expectedCart);
    },
  };
};

type Sut = ReturnType<typeof createSut>;
