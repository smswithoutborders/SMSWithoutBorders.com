import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";
import authReducer from "./auth";
import validationReducer from "./validation";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    auth: authReducer,
    validation: validationReducer,
    [API.reducerPath]: API.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
