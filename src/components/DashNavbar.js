import React, { useState, Fragment } from "react";
import logo from "images/logo-icon-light.png";
import toast from "react-hot-toast";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {
  metricsSelector,
  authSelector,
  logout as logoutAction,
} from "features";
import { useSelector, useDispatch } from "react-redux";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiGrid,
  FiSettings,
  FiExternalLink,
} from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { useLogoutMutation } from "services";
import { Loader } from "./Loader";
import { DashNavLink, ExternalLink } from "./NavLinks";
import { NavButton } from "./Buttons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks";

export const DashNavbar = () => {
  const { t } = useTranslation();
  const { LanguageSwitcher } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metrics = useSelector(metricsSelector);
  const auth = useSelector(authSelector);
  const [navOpen, setNavOpen] = useState(false);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  // helper function for menu toggle and logout
  function toggleMenu() {
    setNavOpen(!navOpen);
  }

  async function handleLogOut() {
    try {
      await logout(auth).unwrap();
      // clear store also handles cache clearing
      // check in features/reducers
      dispatch(logoutAction());
      toast.success(t("alert-messages.logout-successful"));
      navigate("/login", { replace: true, state: null });
    } catch (error) {
      // handle all api errors in utils/middleware
    }
  }

  const ActionLinks = () => (
    <div
      key={2}
      className="flex flex-wrap items-center justify-between gap-2 mt-20 bg-gray-100 lg:bg-white lg:mt-0"
    >
      <LanguageSwitcher />
      {metrics?.name && (
        <div className="flex items-center px-4 lg:px-0">
          <div className="flex items-center justify-center mr-2 bg-blue-800 rounded-full w-9 h-9">
            <p className="font-bold text-center text-white">
              {metrics?.name.charAt(0)}
            </p>
          </div>
          <p className="mr-4 lg:hidden">{metrics?.name}</p>
        </div>
      )}
      <NavButton onClick={() => handleLogOut()}>
        <FiLogOut />
        <span>{t("menu.logout")}</span>
      </NavButton>
    </div>
  );

  const DesktopLinks = () => (
    <div className="lg:flex">
      <DashNavLink onClick={() => toggleMenu()} key="Dashboard" to="metrics">
        <FiGrid size={20} /> <span>{t("menu.dashboard")}</span>
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Sync" to="sync">
        <IoMdSync size={20} /> <span>{t("menu.sync")}</span>
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Wallet" to="wallet">
        <IoWalletOutline size={20} /> <span>{t("menu.wallet")}</span>
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Settings" to="settings">
        <FiSettings size={20} /> <span>{t("menu.settings")}</span>
      </DashNavLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="tutorials"
        href={process.env.REACT_APP_TUTORIAL_URL}
        target="_blank"
      >
        <FiExternalLink size={20} />
        <span>{t("menu.tutorials")}</span>
      </ExternalLink>
    </div>
  );

  const MobileLinks = () => (
    <div className="flex flex-col gap-2">
      <DashNavLink onClick={() => toggleMenu()} key="Dashboard" to="metrics">
        <FiGrid size={20} /> &nbsp; {t("menu.dashboard")}
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Sync" to="sync">
        <IoMdSync size={20} /> &nbsp; {t("menu.sync")}
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Wallet" to="wallet">
        <IoWalletOutline size={20} /> &nbsp; {t("menu.wallet")}
      </DashNavLink>
      <DashNavLink onClick={() => toggleMenu()} key="Settings" to="settings">
        <FiSettings size={20} /> &nbsp; {t("menu.settings")}
      </DashNavLink>
      <ExternalLink
        onClick={() => toggleMenu()}
        key="tutorials"
        href={process.env.REACT_APP_TUTORIAL_URL}
        target="_blank"
      >
        <FiExternalLink size={20} />
        <span>{t("menu.tutorials")}</span>
      </ExternalLink>
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

  /*
    when making requests show loading indicator
    Also maintain after request is successfull to update background state
  */
  if (isLoading || isSuccess) {
    return <Loader />;
  }

  return (
    <Fragment>
      {/* Desktop nav */}
      <nav className="items-center hidden bg-white shadow-lg lg:justify-evenly lg:flex lg:flex-wrap">
        <Logo />
        <DesktopLinks />
        <ActionLinks />
      </nav>
      {/* Mobile nav */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg lg:hidden">
        <div className="flex items-center justify-between p-5">
          <Logo />
          <button className="appearance-none" onClick={() => toggleMenu()}>
            {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {navOpen && (
          <Transition
            show={navOpen}
            appear={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col w-full h-screen p-4 bg-white"
          >
            <MobileLinks />
            <ActionLinks />
          </Transition>
        )}
      </nav>
    </Fragment>
  );
};
