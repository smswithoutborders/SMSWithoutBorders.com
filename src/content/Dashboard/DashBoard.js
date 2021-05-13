import React from "react";
import { Content, } from 'carbon-components-react';
import { Navbar } from "components";
import { Route, Switch } from 'react-router-dom';
import Profile from 'content/Profile';
import Wallet from 'content/Wallet';
import WalletRedirect from 'content/Wallet/WalletRedirect';


const DashBoard = () => {

  return (
    <>
      <Navbar />
      <Content id="main-content" className="bx--col-lg-16">
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/oauth2/google/Tokens/redirect/" component={WalletRedirect} />
        </Switch>
      </Content>
    </>
  );
};

export default DashBoard;
