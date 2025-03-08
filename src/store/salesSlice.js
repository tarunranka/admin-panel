import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSalesData } from "../api/SalesApi";

// Async thunk to fetch sales data
export const fetchSales = createAsyncThunk("sales/fetchSales", async () => {
  const response = await fetchSalesData();
  return response;
});

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.salesData = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
