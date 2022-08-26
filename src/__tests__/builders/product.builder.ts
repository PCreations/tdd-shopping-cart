import { Product } from "../../cart/domain/product";

export const productBuilder = ({
  id = "default-product-id",
  price = 42,
}: { id?: string; price?: number } = {}) => {
  const props = { id, price };

  return {
    ofId(productId: string) {
      return productBuilder({
        ...props,
        id: productId,
      });
    },
    priced(productPrice: number) {
      return productBuilder({
        ...props,
        price: productPrice,
      });
    },
    build() {
      return new Product(props.id, props.price);
    },
  };
};
