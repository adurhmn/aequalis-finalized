import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionExists: false,
  authenticatedUserId: null,
};

const authSlice = createSlice({
  name: "Login Authentication",
  initialState,
  reducers: {
    authenticateUser(state, action) {
      state.sessionExists = true;
      state.authenticatedUserId = action.payload;
    },
    logout(state) {
      state.sessionExists = false;
      state.authenticatedUserId = null;
    },
  },
});

export const authSliceActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
