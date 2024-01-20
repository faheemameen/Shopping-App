import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productSlice,
  },
});
