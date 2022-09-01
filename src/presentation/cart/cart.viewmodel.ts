import { selectCart } from "../../cart/usecases/cart.slice";
import { createSelectProductById } from "../../cart/usecases/product.slice";
import { RootState } from "../../store";

export class CartViewModel {
  selector(state: RootState) {
    const cart = selectCart(state);
    const products = cart.state.products.map((p) => {
      const selectProductById = createSelectProductById(p.productId);
      const product = selectProductById(state);

      return {
        id: product?.id,
        name: product?.name,
        price: `${product?.price}€`,
        quantity: `x ${p.quantity}`,
      };
    });

    return {
      products,
      total: `${cart.state.total}€`,
    };
  }
}
