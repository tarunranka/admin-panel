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

export const verify2FA = createAsyncThunk(
  "auth/verify2FA",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      if (email) {
        const response = await verify2FAApi({ email, code });
        return response;
      }
      return rejectWithValue({ error: "Email is missing" });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Logout action
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true; // Successful logout
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  isAuthenticated: !!Cookies.get("user"),
  requires2FA: false,
  user:
    Cookies.get("user") && JSON.parse(Cookies.get("user"))
      ? JSON.parse(Cookies.get("user"))
      : { firstName: "", lastName: "", email: "" },
  error: null,
};

console.log(initialState);

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
        state.requires2FA = action.payload.requires2FA;
        state.user = { email: action.payload.email };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.requires2FA = false;
        state.user = { email: action.payload.email };
        state.error = action.payload;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        console.log(action.payload);
        Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
        state.isAuthenticated = true;
        state.requires2FA = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.requires2FA = true;
        state.isAuthenticated = false;
        state.user = { email: action.payload?.email };
        state.error = action.payload.error;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        Cookies.remove("user"); // Remove token on logout

        if (
          navigator.credentials &&
          navigator.credentials.preventSilentAccess
        ) {
          navigator.credentials.preventSilentAccess();
        }

        state.isAuthenticated = false;
        state.user = null;
        state.requires2FA = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
