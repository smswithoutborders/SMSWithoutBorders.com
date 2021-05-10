import React, { useState } from 'react';
import './App.scss';

// import Login from './content/Auth';
import Login from "content/Login";
import DashBoard from "content/Dashboard";
import { getToken } from "services/auth.service";

const App = () => {
  
  const token = getToken();
  const isLoggedIn = useState(token ? true : false);

  if (isLoggedIn) {
    return (<DashBoard />);
  } else {
    return (<Login />);
  }
};

export default App;
