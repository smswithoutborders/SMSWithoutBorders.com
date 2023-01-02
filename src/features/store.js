import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { API } from "../services/api";
import { persistState, getPersistedState } from "services";
import { RequestErrorHandler } from "utils";
import rootReducer from "./reducers";

const persistedState = getPersistedState();
/*
 Adding the api middleware enables caching, invalidation, polling,
 and other useful features of `rtk-query`.

 Only allow devtools for development
 preload any persisted state
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware, RequestErrorHandler),
  devTools: process.env.NODE_ENV !== "production" ? true : false,
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
