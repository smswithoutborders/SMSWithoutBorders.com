import { isRejectedWithValue } from "@reduxjs/toolkit";
import { logout } from "features";
import toast from "react-hot-toast";
import i18n from "i18n";

// handle general API request errors
export const RequestErrorHandler = (store) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { status, originalStatus } = action.payload;
    const { endpointName } = action.meta.arg;
    if (originalStatus) {
      switch (originalStatus) {
        case 400:
          toast.error(i18n.t("error-messages.400"));
          break;
        case 401:
          switch (endpointName) {
            case "login":
              toast.error(i18n.t("error-messages.invalid-login"));
              break;
            default: {
              toast.error(i18n.t("error-messages.401"));
              // logout handled in features/reducers
              store.dispatch(logout());
            }
          }
          break;
        case 403:
          toast.error(i18n.t("error-messages.403"));
          break;
        case 404:
          toast.error(i18n.t("error-messages.404"));
          break;
        case 409:
          toast.error(i18n.t("error-messages.409"));
          break;
        case 429:
          toast.error(i18n.t("error-messages.429"));
          break;
        case 500:
          toast.error(i18n.t("error-messages.500"));
          break;
        default:
          toast.error(i18n.t("error-messages.general-error-message"));
      }
    } else if (status === "FETCH_ERROR") {
      toast.error(i18n.t("error-messages.network-error"));
    }
  }
  return next(action);
};
