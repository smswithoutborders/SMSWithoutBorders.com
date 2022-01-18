import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const MainHeader = tw.header`flex justify-between items-center bg-white shadow-lg`;
const NavContainer = tw.div`block lg:inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-primary-300 hocus:outline-none text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(
  Link
)`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-300 hocus:outline-none hocus:text-primary-900 text-gray-900 font-medium hocus:font-bold px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-300 hocus:outline-none text-gray-900 font-medium hocus:font-bold px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const StartedExtLink = tw(ExtLink)`text-primary-900 bg-primary-300 font-bold`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-white hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;

const SignUpLink = tw(NavLink)`bg-primary-900 text-white font-bold`;
const LogInLink = tw(NavLink)`text-primary-900 font-bold`;
const UserActions = tw.div`flex flex-col md:flex-row items-center`;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(
  NavButton
)`lg:hidden focus:outline-none transition duration-300 hocus:bg-white hocus:text-gray-900`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-white`;

export const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }
  const defaultLinks = (
    <React.Fragment key="nav">
      <NavContainer key={1}>
        <StartedExtLink
          onClick={() => toggleMenu()}
          key="Get Started"
          href="https://smswithoutborders.github.io/docs/intro"
          target="_blank"
        >
          Get Started
        </StartedExtLink>
        <NavLink
          onClick={() => toggleMenu()}
          key="privacy-policy"
          to="/privacy-policy"
        >
          Privacy Policy
        </NavLink>
        <ExtLink
          onClick={() => toggleMenu()}
          key="Github"
          href="https://github.com/orgs/smswithoutborders/"
          target="_blank"
        >
          Github
        </ExtLink>
        <ExtLink
          onClick={() => toggleMenu()}
          key="Blog"
          href="https://smswithoutborders.github.io"
          target="_blank"
        >
          Blog
        </ExtLink>
        <NavLink onClick={() => toggleMenu()} key="contact-us" to="/contact-us">
          Contact Us
        </NavLink>
      </NavContainer>
    </React.Fragment>
  );

  const actionLinks = (
    <UserActions key={2}>
      <LogInLink key="login" to="/login">
        <FiLogIn size={20} /> &nbsp; Log In
      </LogInLink>
      <SignUpLink key="sign-up" to="/sign-up">
        <FiUserPlus size={20} /> &nbsp; Sign Up
      </SignUpLink>
    </UserActions>
  );

  const defaultLogoLink = (
    <LogoLink to="/">
      <img src={logo} alt="logo" />
      <span>SMSwithoutborders</span>
    </LogoLink>
  );

  return (
    <MainHeader>
      <DesktopNav>
        {defaultLogoLink}
        {defaultLinks}
        {actionLinks}
      </DesktopNav>
      <MobileNav>
        {defaultLogoLink}
        <NavToggle onClick={() => setOpen(!open)}>
          <FiMenu size={24} />
        </NavToggle>

        <Fragment>
          {defaultLinks}
          {actionLinks}
        </Fragment>
      </MobileNav>
    </MainHeader>
  );
};
