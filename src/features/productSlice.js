import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCodes from "../components/utils/StatusCodes";

const initialState = {
  data: [],
  status: StatusCodes.IDLE,
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //     fetchProducts: (state, action) => {
    //       state.data = action.payload;
    //     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = StatusCodes.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCodes.IDLE;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = StatusCodes.ERROR;
      });
  },
});
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const result = await data.json();
  return result;
});

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const data = await fetch("https://fakestoreapi.com/products");
//     const result = await data.json();
//     dispatch(fetchProducts(result));
//   };
// }

// export const { fetchProducts } = productSlice.actions;
