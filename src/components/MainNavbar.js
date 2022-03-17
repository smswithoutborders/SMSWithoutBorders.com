import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import "styled-components/macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiLogIn, FiUserPlus, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink } from "./NavLink";
import { useTranslation } from "react-i18next";

const ExtLink = tw.a`flex outline-none text-gray-900 font-medium p-5 items-center appearance-none`;
const StartedExtLink = tw(ExtLink)`text-primary-800 font-medium`;
const LogoLink = styled(Link)`
  ${tw`flex items-center text-xl font-bold xl:ml-4`};
  img {
    ${tw`w-10 h-10 mr-3`}
  }
`;
const SignUpLink = tw(NavLink)`bg-primary-800 text-white`;
const LogInLink = tw(NavLink)`text-primary-800`;
const UserActions = tw.div`xl:(flex items-center)`;
const NavContainer = tw.div`xl:flex`;
const MobileNav = tw.nav`xl:hidden z-50 bg-white sticky top-0 shadow-lg`;
const DesktopNav = tw.nav`hidden xl:flex  justify-between items-center bg-white h-16 shadow-lg`;

export const MainNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }
  const defaultLinks = (
    <NavContainer>
      <StartedExtLink
        onClick={() => toggleMenu()}
        key="Get Started"
        href="https://smswithoutborders.github.io/docs/intro"
        target="_blank"
      >
        {t("menu.get-started")}
      </StartedExtLink>
      <NavLink onClick={() => toggleMenu()} key="/" to="/">
        {t("menu.home")}
      </NavLink>
      <NavLink
        onClick={() => toggleMenu()}
        key="privacy-policy"
        to="/privacy-policy"
      >
        {t("menu.privacy")}
      </NavLink>
      <ExtLink
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
      >
        GitHub
      </ExtLink>
      <ExtLink
        onClick={() => toggleMenu()}
        key="Blog"
        href="https://smswithoutborders.github.io"
        target="_blank"
      >
        {t("menu.blog")}
      </ExtLink>
      <NavLink onClick={() => toggleMenu()} key="contact-us" to="/contact-us">
        {t("menu.contact")}
      </NavLink>
    </NavContainer>
  );

  const actionLinks = (
    <UserActions key={2}>
      <LogInLink key="login" to="/login" onClick={() => toggleMenu()}>
        <FiLogIn size={20} /> &nbsp; {t("menu.login")}
      </LogInLink>
      <SignUpLink key="sign-up" to="/sign-up" onClick={() => toggleMenu()}>
        <FiUserPlus size={20} /> &nbsp; {t("menu.signup")}
      </SignUpLink>
    </UserActions>
  );

  const defaultLogoLink = (
    <LogoLink to="/">
      <img src={logo} alt="logo" />
      <span>SMSWithoutBorders</span>
    </LogoLink>
  );

  return (
    <Fragment>
      <DesktopNav>
        {defaultLogoLink}
        {defaultLinks}
        {actionLinks}
      </DesktopNav>
      <MobileNav>
        <div className="flex items-center justify-between p-4">
          {defaultLogoLink}
          <button className="appearance-none" onClick={() => toggleMenu()}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {open && (
          <Transition
            show={open}
            appear={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col w-full h-screen bg-white"
          >
            {defaultLinks}
            {actionLinks}
          </Transition>
        )}
      </MobileNav>
    </Fragment>
  );
};
