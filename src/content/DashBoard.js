import React from "react";
import { Navbar } from "components";
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import Profile from 'content/Profile';
import Wallet from 'content/Wallet';
import WalletRedirect from 'content/Wallet/WalletRedirect';


const DashBoard = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <PageAnimationWrapper>
        <Navbar />
        <Switch>
          <Route exact path={path} component={Profile} />
          <Route exact path={`${path}/profile`} component={Profile} />
          <Route exact path={`${path}/wallet`} component={Wallet} />
          <Route exact path={`${path}/oauth2/google/Tokens/redirect/`} component={WalletRedirect} />
        </Switch>
      </PageAnimationWrapper>
    </>
  );
};


export default DashBoard;
