// user profile management
import { createSlice } from "@reduxjs/toolkit";
import { API } from "services";

// we only extract what is needed. check API Docs for full response body
const initialState = {
  status: "disconnected",
  qrLink: "",
  mobileLink: "",
  syncURL: "",
};
/*
     add a matcher to also update profile when the query runs
     https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
*/
export const sync = createSlice({
  name: "synchronization",
  initialState,
  reducers: {
    updateSync: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      API.endpoints.synchronize.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      }
    );
  },
});

// Action creators are generated for each reducer function
export const { updateSync } = sync.actions;
// sync selector
export const syncSelector = (state) => state.sync;

export default sync.reducer;
