import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/productSlice";
import searchSlice from "../reducers/searchSlice";
import userSlice from "../reducers/userSlice";
import loadingSlice from "../reducers/loadingSlice";
import notificationSlice from "../reducers/notificationSlice";

export default configureStore({
     reducer: {
          productSlice: productSlice,
          searchSlice: searchSlice,
          userSlice: userSlice,
          loadingSlice: loadingSlice,
          notificationSlice: notificationSlice,
     },
});
