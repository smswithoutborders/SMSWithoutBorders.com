import React, { useState, Fragment } from "react";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiX } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink, MobileNavLink, ExternalLink, DropDownLink } from "./NavLinks";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useScroll } from "hooks";
import clsx from "clsx";

export const MainNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const scrolled = useScroll();

  function toggleMenu() {
    setOpen(!open);
  }

  const DesktopLinks = () => (
    <div className="lg:flex">
      <NavLink key="/" to="/" end>
        {t("menu.home")}
      </NavLink>

      <DropDownLink
        key="resources"
        label={t("menu.resources")}
        links={[
          {
            key: "downloads",
            path: "downloads",
            label: t("menu.downloads"),
          },
          {
            external: true,
            key: "tutorials",
            path: process.env.REACT_APP_TUTORIAL_URL,
            label: t("menu.tutorials"),
          },
          {
            key: "beta-testing",
            path: "beta-testing",
            label: t("menu.beta-testing"),
          },
        ]}
      />
      <ExternalLink
        onClick={() => toggleMenu()}
        key="developers"
        href="https://developers.smswithoutborders.com"
        target="_blank"
      >
        {t("menu.developers")}
      </ExternalLink>
      <NavLink key="privacy-policy" to="/privacy-policy">
        {t("menu.privacy")}
      </NavLink>
      <NavLink key="contact-us" to="/contact-us">
        {t("menu.contact")}
      </NavLink>
    </div>
  );

  const ActionLinks = () => (
    <div className="lg:flex lg:items-center">
      <LanguageSwitcher />
      <ExternalLink
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
      >
        <GoMarkGithub size={20} />
        <span className="ml-2">GitHub</span>
      </ExternalLink>
      <NavLink open={open} key="login" to="/login">
        <span className="ml-2">{t("menu.login")}</span>
      </NavLink>
      <NavLink
        key="sign-up"
        to="/sign-up"
        className="text-white bg-blue-800 border-none lg:px-6 lg:py-2 lg:mr-4 lg:rounded-lg"
      >
        <span className="ml-2">{t("menu.signup")}</span>
      </NavLink>
    </div>
  );

  const MobileLinks = () => (
    <div className="">
      <LanguageSwitcher />
      <MobileNavLink onClick={() => toggleMenu()} key="home" to="/" end>
        {t("menu.home")}
      </MobileNavLink>
      <MobileNavLink
        onClick={() => toggleMenu()}
        key="downloads"
        to="/downloads"
      >
        {t("menu.downloads")}
      </MobileNavLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="tutorials"
        href={process.env.REACT_APP_TUTORIAL_URL}
        target="_blank"
      >
        {t("menu.tutorials")}
      </ExternalLink>
      <MobileNavLink
        onClick={() => toggleMenu()}
        key="beta-testing"
        to="beta-testing"
      >
        {t("menu.beta-testing")}
      </MobileNavLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="developers"
        href="https://developers.smswithoutborders.com"
        target="_blank"
      >
        {t("menu.developers")}
      </ExternalLink>
      <MobileNavLink
        onClick={() => toggleMenu()}
        key="privacy-policy"
        to="/privacy-policy"
      >
        {t("menu.privacy")}
      </MobileNavLink>
      <MobileNavLink
        onClick={() => toggleMenu()}
        key="contact-us"
        to="/contact-us"
      >
        {t("menu.contact")}
      </MobileNavLink>

      <ExternalLink
        onClick={() => toggleMenu()}
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
      >
        <GoMarkGithub size={20} />
        <span className="ml-2">GitHub</span>
      </ExternalLink>
      <MobileNavLink
        open={open}
        key="login"
        to="/login"
        onClick={() => toggleMenu()}
      >
        <span className="ml-2">{t("menu.login")}</span>
      </MobileNavLink>
      <MobileNavLink
        key="sign-up"
        to="/sign-up"
        onClick={() => toggleMenu()}
        className="text-white bg-blue-800 xl:px-6 xl:py-2 xl:mr-4 xl:rounded-3xl"
      >
        <span className="ml-2">{t("menu.signup")}</span>
      </MobileNavLink>
    </div>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center text-xl font-bold lg:ml-4">
      <img src={logo} alt="logo" className="w-8 h-8 mr-3" />
      <span>SMSWithoutBorders</span>
    </Link>
  );

  return (
    <Fragment>
      <div
        className={clsx(
          "hidden sticky top-0 z-50 lg:flex justify-between items-center",
          scrolled
            ? "bg-white bg-opacity-80 backdrop-blur-xl shadow-lg"
            : "text-white bg-transparent"
        )}
      >
        <Logo />
        <DesktopLinks />
        <ActionLinks />
      </div>
      <div
        className={clsx(
          "bg-white shadow-lg lg:hidden z-50",
          open
            ? "fixed inset-0 overflow-y-auto  bg-opacity-85 backdrop-blur-xl"
            : "sticky top-0"
        )}
      >
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
            className="flex flex-col h-screen max-w-md mx-auto"
          >
            <MobileLinks />
          </Transition>
        )}
      </div>
    </Fragment>
  );
};
