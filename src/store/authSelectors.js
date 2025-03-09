import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => state.auth;

export const selectMemoizedAuth = createSelector([selectAuthState], (auth) => ({
  email: auth.user?.email || "",
  loading: auth.loading || false,
  error: auth.error || null,
  isAuthenticated: auth.isAuthenticated || false,
}));
