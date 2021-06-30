import React from "react";
import { Navbar, Footer } from "components";
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PageAnimationWrapper from "helpers/PageAnimationWrapper";
import Profile from 'content/Profile';
import Wallet from 'content/Wallet';
import WalletRedirect from 'content/Wallet/WalletRedirect';
import NotFoundPage from "content/NotFoundPage";


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
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </PageAnimationWrapper>
    </>
  );
};


export default DashBoard;
