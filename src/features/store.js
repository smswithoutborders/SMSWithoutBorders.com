import { createAction, configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";
import rootReducer from "./reducers";

// action to clear the store
export const resetStore = createAction("RESET_STORE");

/*
 Adding the api middleware enables caching, invalidation, polling,
 and other useful features of `rtk-query`.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

/*
 optional, but required for refetchOnFocus/refetchOnReconnect behaviors
 see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
*/
setupListeners(store.dispatch);
