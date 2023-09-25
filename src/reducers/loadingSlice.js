import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
     name: "loading",
     initialState: {
          loading: false,
     },
     reducers: {
          loadingProccess: (state, action) => {
               state.loading = action.payload;
          },
     },
});

export const { loadingProccess } = loadingSlice.actions;

export default loadingSlice.reducer;
