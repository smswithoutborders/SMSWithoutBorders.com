import React, { useState } from "react";
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  HeaderPanel,
  SideNav,
  SideNavItems,
  Modal,
  ModalBody,
} from 'carbon-components-react';
import {
  Close20,
  Notification20,
  Logout20,
  Dashboard32
} from '@carbon/icons-react';

import { Route, Switch, Link } from 'react-router-dom';
import { logOut } from "services/auth.service";
import Profile from 'content/Profile';
import Wallet from 'content/Wallet';
import WalletRedirect from 'content/Wallet/WalletRedirect';


const DashBoard = () => {
  //state hook to control left panel view
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Header">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                SMSwithoutBorders User
              </HeaderName>
              <HeaderNavigation aria-label="Main Navigation">
                <HeaderMenuItem element={Link} to="/">
                  Profile
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/wallet">
                  Wallet
                </HeaderMenuItem>
                <HeaderMenuItem
                  onClick={() => setIsAboutOpen(!isAboutOpen)}>
                  About
                </HeaderMenuItem>
              </HeaderNavigation>

              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}>
                  {isPanelOpen ? <Close20 /> : <Notification20 />}
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="logout"
                  onClick={() => logOut()}>
                  <Logout20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem element={Link} to="/">
                      Profile
                    </HeaderMenuItem>
                    <HeaderMenuItem element={Link} to="/wallet">
                      Wallet
                    </HeaderMenuItem>
                    <HeaderMenuItem
                      onClick={() => setIsAboutOpen(!isAboutOpen)}>
                      About
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <HeaderPanel aria-label="Header Panel" expanded={isPanelOpen}>
              </HeaderPanel>
            </Header>

            <Modal
              open={isAboutOpen}
              modalLabel="About"
              modalAriaLabel="About Deku SMS Manager"
              passiveModal
              onRequestClose={() => setIsAboutOpen(!isAboutOpen)}>

              <ModalBody>
                <div className="header-group">
                  <Dashboard32 className="dash-centered-icon" /><span>SMSwithoutBorder</span>
                </div>
                <br />
                <h3><strong>SMSwithoutBorders User</strong></h3>
                <br />
                <div className="version-number">
                  <p>Version number</p>
                  <p>1.0.0</p>
                </div>
              </ModalBody>

            </Modal>

            <Content id="main-content" className="bx--col-lg-16">
              <Switch>
                <Route exact path="/" component={Profile} />
                <Route exact path="/wallet" component={Wallet} />
                <Route exact path="/oauth2/google/Tokens/redirect/" component={WalletRedirect} />
              </Switch>
            </Content>
          </>
        )}
      />
    </>
  );
};

export default DashBoard;
