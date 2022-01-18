import React, { useReducer, useEffect, Fragment } from "react";
import "react-phone-number-input/style.css";
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
  TwitterRedirect,
  GoogleRedirect,
  NotFound,
} from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getLocalState,
  setLocalState,
  clearLocalState,
  removeToken,
  removeProfile,
} from "services/storage.service";
import { Loader } from "components";
import { Toaster } from "react-hot-toast";

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
            <Route path="/" element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="dashboard" element={<Dashboard />}>
              {/* {token ? <Dashboard /> : <Navigate to="/login" />}
               */}
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
            <Route element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
    </AppContext.Provider>
  );
};

export default App;
