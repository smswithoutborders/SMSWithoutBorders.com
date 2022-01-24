import React, { useReducer, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader, RequireAuth, RequireSession } from "components";
import { Toaster } from "react-hot-toast";
import {
  Contact,
  Privacy,
  Dashboard,
  Landing,
  Signup,
  Login,
  Settings,
  Profile,
  Wallet,
  NotFound,
  Website,
  TwitterRedirect,
  GoogleRedirect,
  SignupCodeVerification,
  PhoneNumberVerification,
  PasswordChangeVerification,
  PasswordReset,
} from "pages";
import {
  getLocalState,
  setLocalState,
  clearLocalState,
  removeToken,
  removeProfile,
} from "services/storage.service";

const AppContext = React.createContext();
export const useAppContext = () => React.useContext(AppContext);

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
      };
    }
    case "SETUSERPROFILE": {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        userProfile: action.payload.userProfile,
      };
    }
    case "loading": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

let localState = getLocalState();
let initialState = localState || {
  id: "",
  token: "",
  userProfile: {},
  loading: false,
};

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { loading } = state;

  useEffect(() => {
    setLocalState(state);
    initialState = getLocalState();
  }, [state]);

  const handleLogOut = () => {
    //remove user token from session storage
    dispatch({ type: "loading", payload: true });
    dispatch({
      type: "LOGOUT",
      payload: {
        id: "",
        token: "",
        userProfile: {},
      },
    });
    removeToken();
    removeProfile();
    clearLocalState();
    dispatch({ type: "loading", payload: false });
  };

  if (loading) return <Loader />;

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        handleLogOut,
      }}
    >
      <Fragment>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Website />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="contact-us" element={<Contact />} />
              <Route path="sign-up">
                <Route index element={<Signup />} />
                <Route path="verify" element={<SignupCodeVerification />} />
              </Route>
              <Route path="password-reset">
                <Route index element={<PhoneNumberVerification />} />
                <Route
                  path="verify"
                  element={
                    <RequireSession>
                      <PasswordChangeVerification />
                    </RequireSession>
                  }
                />
                <Route
                  path="reset"
                  element={
                    <RequireSession>
                      <PasswordReset />
                    </RequireSession>
                  }
                />
              </Route>
            </Route>

            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="wallet" element={<Wallet />} />
              <Route
                path="oauth2/google/Tokens/redirect"
                element={<GoogleRedirect />}
              />
              <Route
                path="oauth2/twitter/Tokens/redirect"
                element={<TwitterRedirect />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
    </AppContext.Provider>
  );
};

export default App;
