import { Cart } from "../../cart/domain/cart";
import { ProductItem } from "../../cart/domain/product-item";

export const cartBuilder = ({
  products = [],
  total = 0,
}: { products?: ProductItem["state"][]; total?: number } = {}) => {
  const props = { products, total };

  return {
    empty() {
      return cartBuilder({
        ...props,
        products: [],
        total: 0,
      });
    },
    withProducts(productItems: ProductItem["state"][]) {
      return cartBuilder({
        ...props,
        products: productItems,
      });
    },
    withTotal(cartTotal: number) {
      return cartBuilder({
        ...props,
        total: cartTotal,
      });
    },
    build() {
      return Cart.fromData(props);
    },
  };
};
