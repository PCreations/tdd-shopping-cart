import { cartBuilder } from "../../../__tests__/builders/cart.builder";
import { storeBuilder } from "../../../__tests__/builders/store.builder";
import { CartViewModel } from "../cart.viewmodel";

describe("CartViewModel", () => {
  it("should select the cart products and total", () => {
    const cartViewModel = new CartViewModel();
    const mustard = {
      id: "mustard",
      name: "Mustard",
      description: "Best Mustard In Town",
      price: 2.5,
    };
    const ketchup = {
      id: "ketchup",
      name: "Ketchup",
      description: "Ketchup with bio tomatoes",
      price: 2,
    };
    const store = storeBuilder()
      .withFetchedProducts([mustard, ketchup])
      .withCart(
        cartBuilder()
          .withProducts([
            {
              productId: mustard.id,
              price: mustard.price,
              quantity: 2,
            },
            {
              productId: ketchup.id,
              price: ketchup.price,
              quantity: 1,
            },
          ])
          .withTotal(7)
          .build()
      )
      .build();
    const state = cartViewModel.selector(store.getState());

    expect(state).toEqual({
      products: [
        {
          id: "mustard",
          name: "Mustard",
          price: "2.5€",
          quantity: "x 2",
        },
        {
          id: "ketchup",
          name: "Ketchup",
          price: "2€",
          quantity: "x 1",
        },
      ],
      total: "7€",
    });
  });
});
