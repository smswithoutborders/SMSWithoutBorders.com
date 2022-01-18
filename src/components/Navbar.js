import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import "styled-components/macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppContext } from "App";
import {
  FiMenu,
  FiInfo,
  FiSettings,
  FiUser,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";

const MainHeader = tw.header`flex justify-between items-center bg-white shadow-lg`;
const NavContainer = tw.div`block lg:inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-primary-900 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(
  Link
)`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-900 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-300 hocus:outline-none text-gray-900 font-medium hocus:font-bold px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const StartedExtLink = tw(ExtLink)`text-primary-900 bg-primary-300 font-bold`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-white hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-col lg:flex-row items-center`;
const UserActionsButton = tw(
  NavButton
)`w-full lg:w-max flex flex-row items-center px-6 py-3 md:px-4 `;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(
  NavButton
)`lg:hidden focus:outline-none transition duration-300 hocus:bg-white hocus:text-gray-900`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-white`;

export const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { state, handleLogOut } = useAppContext();
  const { userProfile } = state;

  function toggleMenu() {
    setOpen(!open);
  }

  const defaultLinks = [
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <StartedExtLink
          onClick={() => toggleMenu()}
          key="Get Started"
          href="https://smswithoutborders.github.io/docs/intro"
          target="_blank"
        >
          <FiExternalLink size={20} /> &nbsp; Get Started
        </StartedExtLink>
        <NavLink onClick={() => toggleMenu()} key="Profile" to="profile">
          <FiUser size={20} /> &nbsp; Profile
        </NavLink>
        <NavLink onClick={() => toggleMenu()} key="Sync" to="profile">
          <IoMdSync size={20} /> &nbsp; Sync
        </NavLink>
        <NavLink onClick={() => toggleMenu()} key="Wallet" to="wallet">
          <IoWalletOutline size={20} /> &nbsp; Wallet(Store Access)
        </NavLink>
        <NavLink onClick={() => toggleMenu()} key="Settings" to="settings">
          <FiSettings size={20} /> &nbsp; Settings
        </NavLink>
      </NavContainer>
    </React.Fragment>,
  ];

  const actionLinks = (
    <UserActions key={2}>
      <UserActionsButton onClick={() => setIsAboutOpen(!isAboutOpen)}>
        <FiInfo size={20} />
      </UserActionsButton>
      {userProfile && (
        <UserActionsButton onClick={() => toggleMenu()}>
          <div className="flex items-center">
            <div className="flex items-center justify-center mr-2 bg-blue-100 rounded-full w-7 h-7">
              <p className="font-bold text-center text-gray-800">
                {userProfile?.name.charAt(0)}
              </p>
            </div>
          </div>
        </UserActionsButton>
      )}
      <UserActionsButton onClick={() => handleLogOut()}>
        <FiLogOut /> &nbsp; Logout
      </UserActionsButton>
    </UserActions>
  );

  const mobileActionLinks = (
    <UserActions key={2}>
      <UserActionsButton
        onClick={() => {
          setOpen(false);
          setIsAboutOpen(!isAboutOpen);
        }}
      >
        <FiInfo size={20} /> &nbsp; About
      </UserActionsButton>
      {userProfile && (
        <UserActionsButton tw="px-5 md:px-3" onClick={() => toggleMenu()}>
          {userProfile?.name}
          <div className="flex items-center">
            <div className="flex items-center justify-center mr-2 bg-blue-100 rounded-full w-7 h-7">
              <p className="font-bold text-center text-gray-800">
                {userProfile?.name.charAt(0)}
              </p>
            </div>
            <p className="mr-4 text-sm">{userProfile?.name}</p>
          </div>
        </UserActionsButton>
      )}
      <UserActionsButton onClick={() => handleLogOut()}>
        <FiLogOut /> &nbsp; Logout
      </UserActionsButton>
    </UserActions>
  );

  const defaultLogoLink = (
    <LogoLink to="/dashboard">
      <img src={logo} alt="logo" />
      <span>SMSwithoutborders</span>
    </LogoLink>
  );

  return (
    <Fragment>
      <MainHeader>
        <DesktopNav>
          {defaultLogoLink}
          {defaultLinks}
          {actionLinks}
        </DesktopNav>
        <MobileNav>
          {defaultLogoLink}
          <NavToggle onClick={() => toggleMenu()}>
            <FiMenu size={24} />
          </NavToggle>
          <Fragment>
            {defaultLinks}
            {mobileActionLinks}
          </Fragment>
        </MobileNav>
      </MainHeader>
    </Fragment>
  );
};
