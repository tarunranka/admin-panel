import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import salesReducer from "./salesSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    sales: salesReducer,
  },
});
