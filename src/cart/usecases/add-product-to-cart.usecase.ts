import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkExtraArg } from "../../store";
import { cartSlice, selectCart } from "./cart.slice";

export class AddProductCartRequest {
  constructor(readonly productId: string) {}
}

export const addProductToCart = createAsyncThunk<
  void,
  AddProductCartRequest,
  {
    extra: ThunkExtraArg;
    state: RootState;
  }
>(
  "cart/addProductToCart",
  async (addProductInCartRequest, { extra, getState, dispatch }) => {
    const product = await extra.productRepository.getById(
      addProductInCartRequest.productId
    );
    const cart = selectCart(getState());

    cart.addProduct(product!);

    dispatch(cartSlice.actions.cartSaved({ cart: cart.state }));
  }
);
