import { InMemoryCartStore } from "../../../cart/infra/inmemory.cart.store";
import { InMemoryCatalogStore } from "../../../catalog/infra/inmemory.catalog.store";
import { cartBuilder } from "../../../__tests__/builders/cart.builder";
import { CartViewModel } from "../cart.viewmodel";

describe("CartViewModel", () => {
  it("should select the cart products and total", (done) => {
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
    const catalogStore = new InMemoryCatalogStore();
    const cartStore = new InMemoryCartStore();
    catalogStore.addMany([mustard, ketchup]);
    cartStore.setCart(
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
    );
    const cartViewModel = new CartViewModel(catalogStore, cartStore);

    cartViewModel.subscribe((data) => {
      try {
        expect(data).toEqual({
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
      } finally {
        done();
      }
    });
  });
});
