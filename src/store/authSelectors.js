import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => {
  console.log(state);
  return state.auth;
};

export const selectMemoizedAuth = createSelector([selectAuthState], (auth) => ({
  email: auth.user?.email || "",
  user: auth.user || "",
  loading: auth.loading || false,
  error: auth.error || null,
  isAuthenticated: auth.isAuthenticated || false,
}));
