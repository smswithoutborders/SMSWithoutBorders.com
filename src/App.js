import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import Login from "content/Login";
import SignUp from "content/SignUp"
import DashBoard from "content/Dashboard";
import { getToken } from "services/auth.service";

const App = () => {

  let token = getToken();
  let isLoggedIn = false;

  if (token) {
    isLoggedIn = true;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/dashboard">
          {isLoggedIn ? <DashBoard /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
