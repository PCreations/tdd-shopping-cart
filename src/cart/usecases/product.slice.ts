import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  getProductList,
  ProductList,
  ProductState,
} from "./product-list.query";

export const productsAdapter = createEntityAdapter<ProductState>();

export const productSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      productsAdapter.addMany(state, action.payload.products);
    });
  },
});

const createSelector =
  <T>(selector: (sliceState: RootState[typeof productSlice["name"]]) => T) =>
  (state: RootState) =>
    selector(state[productSlice.name]);

export const selectIsProductListLoading = createSelector(
  (sliceState) => sliceState.loading
);

export const selectProductList = createSelector(
  (sliceState) =>
    new ProductList(productsAdapter.getSelectors().selectAll(sliceState))
);

export const createSelectProductById = (productId: string) =>
  createSelector((sliceState) =>
    productsAdapter.getSelectors().selectById(sliceState, productId)
  );
