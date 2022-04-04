import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import "styled-components/macro";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiX } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink, ExternalLink } from "./NavLinks";
import { useTranslation } from "react-i18next";

const UserActions = tw.div`xl:(flex items-center)`;
const MobileNav = tw.nav`xl:hidden z-50 bg-white sticky top-0 shadow-lg`;
const DesktopNav = tw.nav`hidden xl:flex  justify-between items-center bg-white shadow-lg`;

export const MainNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }

  const SharedLinks = () => (
    <div className="xl:flex">
      <ExternalLink
        onClick={() => toggleMenu()}
        key="Get Started"
        href={process.env.REACT_APP_TUTORIAL_URL}
        target="_blank"
      >
        {t("menu.get-started")}
      </ExternalLink>
      <NavLink onClick={() => toggleMenu()} key="/" to="/">
        {t("menu.home")}
      </NavLink>

      <NavLink onClick={() => toggleMenu()} key="downloads" to="/downloads">
        {t("menu.downloads")}
      </NavLink>
      <NavLink
        onClick={() => toggleMenu()}
        key="privacy-policy"
        to="/privacy-policy"
      >
        {t("menu.privacy")}
      </NavLink>

      <NavLink onClick={() => toggleMenu()} key="contact-us" to="/contact-us">
        {t("menu.contact")}
      </NavLink>
    </div>
  );

  const ActionLinks = () => (
    <UserActions>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
      >
        <GoMarkGithub size={20} />
        <span className="ml-2">GitHub</span>
      </ExternalLink>
      <NavLink key="login" to="/login" onClick={() => toggleMenu()}>
        <span className="ml-2">{t("menu.login")}</span>
      </NavLink>
      <NavLink
        key="sign-up"
        to="/sign-up"
        onClick={() => toggleMenu()}
        className="text-white bg-blue-800 xl:px-6 xl:py-2 xl:mr-4 xl:rounded-3xl"
      >
        <span className="ml-2">{t("menu.signup")}</span>
      </NavLink>
    </UserActions>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center text-xl font-bold xl:ml-4">
      <img src={logo} alt="logo" className="w-10 h-10 mr-3" />
      <span>SMSWithoutBorders</span>
    </Link>
  );

  return (
    <Fragment>
      <DesktopNav>
        <Logo />
        <SharedLinks />
        <ActionLinks />
      </DesktopNav>
      <MobileNav>
        <div className="flex items-center justify-between p-4">
          <Logo />
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
            <SharedLinks />
            <ActionLinks />
          </Transition>
        )}
      </MobileNav>
    </Fragment>
  );
};
