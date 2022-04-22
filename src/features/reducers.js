// contains all store reducers
import { combineReducers } from "@reduxjs/toolkit";
import { API } from "../services/api";
import authReducer from "./auth";
import metricsReducer from "./metrics";
import syncReducer from "./sync";
import tutorialReducer from "./tutorials";

// Add the generated reducer as a specific top-level reducer
const appReducer = combineReducers({
  auth: authReducer,
  sync: syncReducer,
  metrics: metricsReducer,
  tutorials: tutorialReducer,
  [API.reducerPath]: API.reducer,
});

/*
 adding condition to reset all store state
 check store.js for action Creator definition
 https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store?page=1&tab=votes#tab-top
*/
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
