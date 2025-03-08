import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import salesReducer from "./salesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    sales: salesReducer,
  },
});
