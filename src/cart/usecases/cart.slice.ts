import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Cart, CartState } from "../domain/cart";

export const cartInitialState: CartState = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    cartSaved(_, action: PayloadAction<{ cart: CartState }>) {
      return action.payload.cart;
    },
  },
});

export const selectCart = (rootState: RootState) =>
  Cart.fromState(rootState[cartSlice.name]);
