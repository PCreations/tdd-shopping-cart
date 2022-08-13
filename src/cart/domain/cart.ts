import { ProductItem } from "./product-item";

export class Cart {
  constructor(readonly products: ProductItem[], readonly total: number) {}
}
