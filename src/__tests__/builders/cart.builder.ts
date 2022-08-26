import { Cart } from "../../cart/domain/cart";
import { ProductItem } from "../../cart/domain/product-item";

export const cartBuilder = ({
  products = [],
  total = 0,
}: { products?: ProductItem[]; total?: number } = {}) => {
  const props = { products, total };

  return {
    empty() {
      return cartBuilder({
        ...props,
        products: [],
        total: 0,
      });
    },
    withProducts(
      productItems: { productId: string; price: number; quantity: number }[]
    ) {
      return cartBuilder({
        ...props,
        products: productItems.map(
          (item) => new ProductItem(item.productId, item.quantity, item.price)
        ),
      });
    },
    withTotal(cartTotal: number) {
      return cartBuilder({
        ...props,
        total: cartTotal,
      });
    },
    build() {
      return new Cart(props.products, props.total);
    },
  };
};
