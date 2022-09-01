import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "../../store";

export type ProductState = {
  id: string;
  price: number;
  name: string;
  description: string;
};

export class ProductList {
  constructor(
    readonly products: {
      id: string;
      price: number;
      name: string;
      description: string;
    }[]
  ) {}

  get state() {
    return {
      products: this.products,
    };
  }
}

export type GetProductList = {
  (): Promise<ProductList>;
};

export const getProductList = createAsyncThunk<
  ProductList["state"],
  void,
  { extra: ThunkExtraArg }
>("products/getProductList", async (_, { extra }) => {
  const productList = await extra.getProductList();

  return productList.state;
});
