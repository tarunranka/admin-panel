// 📂 src/store/salesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSalesData, fetchSalesOrdersData } from "../api/salesApi";

// Async thunk to fetch sales data
export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSalesData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch sales orders
export const fetchSalesOrders = createAsyncThunk(
  "sales/fetchSalesOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSalesOrdersData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: [],
    salesOrdersData: [],
    salesLoading: false,
    ordersLoading: false,
    salesError: null,
    ordersError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Sales Data
      .addCase(fetchSales.pending, (state) => {
        state.salesLoading = true;
        state.salesError = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.salesLoading = false;
        state.salesData = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.salesLoading = false;
        state.salesError = action.error.message;
      })

      // Fetch Sales Orders Data
      .addCase(fetchSalesOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.salesOrdersData = action.payload;
      })
      .addCase(fetchSalesOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.error.message;
      });
  },
});

export default salesSlice.reducer;
