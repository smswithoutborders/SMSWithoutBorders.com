import { createAction, configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";
import rootReducer from "./reducers";
import { persistState, getPersistedState } from "services";

const persistedState = getPersistedState();
// action to clear the store
export const resetStore = createAction("RESET_STORE");

/*
 Adding the api middleware enables caching, invalidation, polling,
 and other useful features of `rtk-query`.

 Only allow devtools for development
 preload any persisted state
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

//subscribe to store changes and persist auth state
store.subscribe(() => {
  persistState({
    auth: store.getState().auth,
  });
});

/*
 optional, but required for refetchOnFocus/refetchOnReconnect behaviors
 see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
*/
setupListeners(store.dispatch);
