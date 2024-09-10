import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice" // from export default productsSlice.reducer;

export const store = configureStore({
  reducer: {
    products: productsReducer,
  }
})