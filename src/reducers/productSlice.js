import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
     name: "product",
     initialState: {
          review: undefined,
          cart: undefined,
          payment: undefined,
     },
     reducers: {
          reviewProduct: (state, action) => {
               state.review = action.payload;
          },
          addCart: (state, action) => {
               state.cart = action.payload;
          },
     },
});

export const { reviewProduct, addCart } = productSlice.actions;

export default productSlice.reducer;
