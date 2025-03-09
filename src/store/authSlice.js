/* eslint-disable no-unused-vars */
// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginApi, verify2FAApi, logoutApi } from "../api/authApi";

// Step 1: Login (but require 2FA)
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginApi({ email, password });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout action
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  return await logoutApi();
});

// Initial state
const initialState = {
  isAuthenticated: !!Cookies.get("token"),
  user: Cookies.get("token")
    ? { firstName: "Tarun", lastName: "User", email: "" }
    : null,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
