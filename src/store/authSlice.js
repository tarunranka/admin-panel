/* eslint-disable no-unused-vars */
// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const token = "fake-token";
          Cookies.set("token", token);

          if (window.PasswordCredential) {
            const cred = new PasswordCredential({ id: email, password });
            navigator.credentials.store(cred);
          }

          resolve({ token, email, firstName: "Tarun", lastName: "User" });
        }, 1500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout action
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      Cookies.remove("token");
      if (navigator.credentials && navigator.credentials.preventSilentAccess) {
        navigator.credentials.preventSilentAccess();
      }
      resolve();
    }, 1000);
  });
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
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
