import { CartStore } from "../../cart/domain/cart.store";
import { CatalogStore } from "../../catalog/domain/catalog.store";
import { ViewModel } from "../view-model";

export type CartViewData = {
  products: {
    id: string;
    name: string;
    price: string;
    quantity: string;
  }[];
  total: string;
};
export class CartViewModel extends ViewModel<CartViewData> {
  constructor(
    private readonly catalogStore: CatalogStore,
    private readonly cartStore: CartStore
  ) {
    super([catalogStore, cartStore]);
  }

  protected selector() {
    const cart = this.cartStore.selectCart();
    const products = cart.data.products.map((p) => {
      const product = this.catalogStore.selectProductById(p.productId);

      return {
        id: product!.id,
        name: product!.name,
        price: `${product?.price}€`,
        quantity: `x ${p.quantity}`,
      };
    });

    return {
      products,
      total: `${cart.data.total}€`,
    };
  }
}
