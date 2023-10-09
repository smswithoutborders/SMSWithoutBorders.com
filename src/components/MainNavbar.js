import React, { useState, Fragment } from "react";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiX, FiFacebook } from "react-icons/fi";
// import { GoMarkGithub } from "react-icons/go";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { NavLink, MobileNavLink, ExternalLink, DropDownLink } from "./NavLinks";
import { useTranslation } from "react-i18next";
import { useScroll, useLanguage } from "hooks";
import clsx from "clsx";

export const MainNavbar = () => {
  const { t } = useTranslation();
  const { LanguageSwitcher } = useLanguage();

  const [open, setOpen] = useState(false);

  const scrolled = useScroll();

  function toggleMenu() {
    setOpen(!open);
  }

  const DesktopLinks = () => (
    <div className="flex flex-wrap gap-4">
      <NavLink key="/" to="/" end>
        {t("menu.home")}
      </NavLink>

      <ExternalLink
        style={{ marginLeft: 10 }}
        onClick={() => toggleMenu()}
        key="blog"
        href="https://afkanerd.github.io/"
        target="_blank"
      >
        {t("menu.blog")}
      </ExternalLink>

      <ExternalLink
        style={{ marginLeft: 10 }}
        onClick={() => toggleMenu()}
        key="tutorials"
        href={process.env.REACT_APP_TUTORIAL_URL}
        target="_blank"
      >
        {t("menu.tutorials")}
      </ExternalLink>

      <NavLink key="privacy-policy" to="/privacy-policy">
        {t("menu.privacy")}
      </NavLink>

      <NavLink key="contact-us" to="/contact-us">
        {t("menu.contact")}
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
            key: "beta-testing",
            path: "beta-testing",
            label: t("menu.beta-testing"),
          },
        ]}
      />
    </div>
  );

  const ActionLinks = () => (
    <div className="flex flex-wrap items-center gap-2">
      <LanguageSwitcher />
      <ExternalLink
        key="Github"
        href="https://github.com/orgs/smswithoutborders/"
        target="_blank"
      >
        <FaGithub size={20} />
      </ExternalLink>
      <ExternalLink
        key="Twitter"
        href="https://twitter.com/SwobOutreach"
        target="_blank"
      >
        <FaXTwitter size={20} />
      </ExternalLink>

      <ExternalLink
        key="Facebook"
        href="https://www.facebook.com/SMSWithoutBorders"
        target="_blank"
      >
        <FiFacebook size={20} />
      </ExternalLink>
      <NavLink open={open} key="login" to="/login">
        {t("menu.login")}
      </NavLink>
      <NavLink
        key="sign-up"
        to="/sign-up"
        className="text-white bg-blue-800 border-none rounded-lg lg:px-6 lg:py-2"
      >
        {t("menu.signup")}
      </NavLink>
    </div>
  );

  const MobileLinks = () => (
    <div className="flex flex-col gap-2 p-4">
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
        //key="blog"
        href="https://afkanerd.github.io/"
        target="_blank"
      >
        {t("menu.blog")}
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
        <faGithub size={20} />
        <span>GitHub</span>
      </ExternalLink>

      <ExternalLink
        onClick={() => toggleMenu()}
        key="Twitter"
        href="https://twitter.com/SwobOutreach"
        target="_blank"
      >
        <FaXTwitter size={20} />
        <span>X</span>
      </ExternalLink>

      <ExternalLink
        onClick={() => toggleMenu()}
        key="Facebook"
        href="https://www.facebook.com/SMSWithoutBorders"
        target="_blank"
      >
        <FiFacebook size={20} />
        <span>Facebook</span>
      </ExternalLink>

      <MobileNavLink
        open={open}
        key="login"
        to="/login"
        onClick={() => toggleMenu()}
      >
        {t("menu.login")}
      </MobileNavLink>
      <MobileNavLink
        key="sign-up"
        to="/sign-up"
        onClick={() => toggleMenu()}
        className="text-white bg-blue-800 rounded-lg"
      >
        {t("menu.signup")}
      </MobileNavLink>
    </div>
  );

  const Logo = () => (
    <Link
      to="/"
      dir="ltr"
      className="flex items-center gap-2 text-xl font-bold"
    >
      <img src={logo} alt="logo" className="w-8 h-8" />
      <span>SMSWithoutBorders</span>
    </Link>
  );

  return (
    <Fragment>
      {/* Desktop nav */}
      <nav
        className={clsx(
          "hidden sticky top-0 z-50 lg:flex justify-evenly items-center",
          scrolled
            ? "bg-white bg-opacity-80 backdrop-blur-xl shadow-lg"
            : "text-white bg-transparent"
        )}
      >
        <Logo />
        <DesktopLinks />
        <ActionLinks />
      </nav>
      {/* Mobile nav */}
      <nav
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
      </nav>
    </Fragment>
  );
};
