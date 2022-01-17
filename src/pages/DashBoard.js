import React from "react";
import { Navbar, Footer, PageAnimationWrapper } from "components";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Profile from 'pages/Profile';
import Wallet from 'pages/Wallet';
import GoogleRedirect from 'pages/Wallet/GoogleRedirect';
import TwitterRedirect from "pages/Wallet/TwitterRedirect";
import NotFoundPage from "pages/NotFoundPage";
import SettingsPage from "pages/SettingsPage";


const DashBoard = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <PageAnimationWrapper>
        <Navbar />
        <Switch>
          <Route exact path={path} component={Profile} />
          <Route exact path={`${path}/profile`} component={Profile} />
          <Route exact path={`${path}/settings`} component={SettingsPage} />
          <Route exact path={`${path}/wallet`} component={Wallet} />
          <Route exact path={`${path}/oauth2/google/Tokens/redirect/`} component={GoogleRedirect} />
          <Route exact path={`${path}/oauth2/twitter/Tokens/redirect/`} component={TwitterRedirect} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </PageAnimationWrapper>
    </>
  );
};


export default DashBoard;
