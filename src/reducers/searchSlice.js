import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
     name: "search",
     initialState: {
          open: false,
          searchText: "",
     },
     reducers: {
          open: (state) => {
               state.open = true;
          },
          close: (state) => {
               state.open = false;
          },
          search: (state, action) => {
               state.searchText = action.payload;
          },
     },
});

export const { open, close, search } = searchSlice.actions;

export default searchSlice.reducer;
