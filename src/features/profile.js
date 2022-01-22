// user profile management
import { createSlice } from "@reduxjs/toolkit";
import { API } from "services";

// we only extract what is needed. check API Docs for full response body
const initialState = {
  id: "",
  name: "",
  last_login: "",
  created: "",
};
/* 
     add a matcher to also update profile when the query runs
     https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
*/
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      const { id, name, last_login, created } = action.payload;
      return {
        ...state,
        id,
        name,
        last_login,
        created,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      API.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        const { id, name, last_login, created } = payload;
        return {
          ...state,
          id,
          name,
          last_login,
          created,
        };
      }
    );
  },
});

// Action creators are generated for each reducer function
export const { saveProfile } = profileSlice.actions;

// profile selector
export const profileSelector = (state) => state.profile;

export default profileSlice.reducer;
