import React, { useState } from "react";
import PropTypes from 'prop-types';
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
  Switcher,
  SideNav,
  SideNavItems,
  Modal,
  ModalBody,
  SwitcherDivider
} from 'carbon-components-react';
import {
  Close20,
  Notification20,
  Logout20,
  Dashboard32
} from '@carbon/icons-react';

import { Route, Switch, Link } from 'react-router-dom';
import { logOut } from "../../services/auth.service";
import Profile from '../Profile';
import Settings from '../Settings';


const DashBoard = ({ setIsLoggedIn }) => {
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
                <HeaderMenuItem element={Link} to="/settings">
                  Settings
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
                  onClick={() => logOut(setIsLoggedIn)}>
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
                    <SwitcherDivider />
                    <HeaderMenuItem element={Link} to="/settings">
                      Settings
                    </HeaderMenuItem>
                    <SwitcherDivider />

                    <HeaderMenuItem
                      onClick={() => setIsAboutOpen(!isAboutOpen)}>
                      About
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <HeaderPanel aria-label="Header Panel" expanded={isPanelOpen}>
                <Switcher aria-label="Switcher Container">
                </Switcher>
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
                <Route exact path="/settings" component={Settings} />
              </Switch>
            </Content>
          </>
        )}
      />
    </>
  );
};

DashBoard.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default DashBoard;
