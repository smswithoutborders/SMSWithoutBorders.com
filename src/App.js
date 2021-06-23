import React, { useReducer, useEffect } from 'react';
import './App.css';
import "rsuite/dist/styles/rsuite-default.css";
import "tailwindcss/dist/base.css";
import Login from "content/Login";
import SignUp from "content/SignUp"
import HomePage from 'content/HomePage';
import DashBoard from "content/DashBoard";
import PrivacyPage from 'content/PrivacyPage';
import ContactPage from 'content/ContactPage';
import AnimateLoader from "components/Loaders/AnimateLoader";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { getLocalState, setLocalState, clearLocalState, removeToken, removeProfile } from "services/storage.service";

const AppContext = React.createContext();
export const useAppContext = () => React.useContext(AppContext);

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token
      }
    }
    case "SETUSERPROFILE": {
      return {
        ...state,
        userProfile: action.payload
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        userProfile: action.payload.userProfile
      }
    }
    case 'loading': {
      return {
        ...state,
        loading: action.payload
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};


let localState = getLocalState();
let initialState = localState || {
  id: "",
  token: "",
  userProfile: {},
  loading: false
}


const App = () => {

  const [state, dispatch] = useReducer(Reducer, initialState);

  const { token, loading } = state;

  useEffect(() => {
    setLocalState(state);
    initialState = getLocalState();
  }, [state])


  const handleLogOut = () => {
    //remove user token from session storage
    dispatch({ type: "loading", payload: true })
    dispatch({
      type: "LOGOUT",
      payload: {
        id: "",
        token: "",
        userProfile: {}
      }
    });
    removeToken();
    removeProfile();
    clearLocalState();
    dispatch({ type: "loading", payload: false })
  }

  if (loading) {
    return (
      <AnimateLoader />
    );
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        handleLogOut
      }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/privacy-policy">
            <PrivacyPage />
          </Route>
          <Route exact path="/contact-us">
            <ContactPage />
          </Route>

          <Route path="/dashboard">
            {token ? <DashBoard /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {token ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};


export default App;
