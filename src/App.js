import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

// import Login from './content/Auth';
import Login from "content/Login";
import SignUp from "content/SignUp"
import DashBoard from "content/Dashboard";
import { getToken } from "services/auth.service";

const App = () => {

  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <DashBoard /> : <Redirect to="/login" />}
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
  );
};

export default App;
