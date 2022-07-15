import { isRejectedWithValue } from "@reduxjs/toolkit";
import { resetStore } from "features";
import { clearCache, clearPersistedState } from "services";
import toast from "react-hot-toast";
import i18n from "i18n";

// middleware to check for user session expiry
export const sessionExpiryChecker = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { originalStatus } = action.payload;
    if (originalStatus === 401) {
      // reset store/logout
      store.dispatch(resetStore());
      // clear local cache if any
      clearCache();
      clearPersistedState();
    }
  }
  return next(action);
};

// handle general API request errors
export const RequestErrorHandler = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { originalStatus } = action.payload;
    if (originalStatus === 404) {
      toast.error(i18n.t("error-messages.404"));
    }
  }
  return next(action);
};
