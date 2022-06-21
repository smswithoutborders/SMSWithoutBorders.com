// user profile management
import { createSlice } from "@reduxjs/toolkit";
import { API } from "services";

// we only extract what is needed. check API Docs for full response body
const initialState = {
  createdAt: "",
  updatedAt: "",
};
/* 
     add a matcher to also update profile when the query runs
     https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
*/
export const metrics = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      const { createdAt, updatedAt } = action.payload;
      return {
        ...state,
        createdAt,
        updatedAt,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      API.endpoints.getMetrics.matchFulfilled,
      (state, { payload }) => {
        const { createdAt, updatedAt } = payload;
        return {
          ...state,
          createdAt,
          updatedAt,
        };
      }
    );
  },
});

// Action creators are generated for each reducer function
export const { saveProfile } = metrics.actions;

// profile selector
export const metricsSelector = (state) => state.profile;

export default metrics.reducer;
