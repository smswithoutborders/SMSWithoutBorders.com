import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  HeaderPanel,
  SwitcherItem,
  Switcher,
  SwitcherDivider,
  Modal,
  ModalBody
} from 'carbon-components-react';
import {
  UserAvatar16,
  Search20,
  Close20,
  Notification20,
  Grid16,
  Logout16,
  Switcher16 as RailSwitch,
  Switcher20,
  Dashboard32,
  Settings16
} from '@carbon/icons-react';

import { Route, Switch, Link } from 'react-router-dom';
import { logOut } from "../../services/auth.service";
import Profile from '../Profile';
import Settings from '../Settings';


const DashBoard = ({ setIsLoggedIn }) => {
  //state hook to control left panel view
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSideNavRail, setIsSideNavRail] = useState(false);
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
                <HeaderMenuItem
                  onClick={() => setIsSideNavRail(!isSideNavRail)}>
                  {isSideNavRail ? <RailSwitch /> : <Grid16 />}
                </HeaderMenuItem>
                <HeaderMenuItem
                  onClick={() => setIsAboutOpen(!isAboutOpen)}>
                  About
                </HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Search">
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications">
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Menu"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}>
                  {isPanelOpen ? <Close20 /> : <Switcher20 />}
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <HeaderPanel aria-label="Header Panel" expanded={isPanelOpen}>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem
                    aria-label="profile"
                    element={Link} to="/profile"
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    <UserAvatar16 className="dash-centered-icon" /> Profile
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    aria-label="settings"
                    element={Link} to="/settings"
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    <Settings16 className="dash-centered-icon" /> Settings
                  </SwitcherItem>
                  <SwitcherDivider />
                  <SwitcherItem
                    aria-label="logout"
                    onClick={() => logOut(setIsLoggedIn)}
                  >
                    <Logout16 className="dash-centered-icon" /> Logout
                  </SwitcherItem>
                  <SwitcherDivider />
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
                <Route exact path="/" component={Settings} />
                <Route exact path="/profile" component={Profile} />
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
