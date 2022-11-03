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
import { FiMenu, FiX, FiLogOut, FiGrid, FiSettings } from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { useLogoutMutation } from "services";
import { Loader } from "./Loader";
import { DashNavLink } from "./NavLinks";
import { NavButton } from "./Buttons";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const DashNavbar = () => {
  const { t } = useTranslation();
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
      // https://redux-toolkit.js.org/rtk-query/usage/error-handling
      const { status, originalStatus } = error;
      if (originalStatus) {
        switch (originalStatus) {
          case 400:
            toast.error(t("error-messages.400"));
            break;
          case 401:
            toast.error(t("error-messages.401"));
            break;
          case 403:
            toast.error(t("error-messages.403"));
            break;
          case 409:
            toast.error(t("error-messages.409"));
            break;
          case 429:
            toast.error(t("error-messages.429"));
            break;
          case 500:
            toast.error(t("error-messages.500"));
            break;
          default:
            toast.error(t("error-messages.general-error-message"));
        }
      } else if (status === "FETCH_ERROR") {
        toast.error(t("error-messages.network-error"));
      }
    }
  }

  const ActionLinks = () => (
    <div
      key={2}
      className="flex items-center justify-between mt-20 bg-gray-100 lg:bg-white lg:mt-0"
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
        <FiLogOut /> &nbsp; {t("menu.logout")}
      </NavButton>
    </div>
  );

  const DesktopLinks = () => (
    <div className="lg:flex">
      <NavButton
        onClick={() => {
          navigate("wallet?tutorial=onboarding");
          toggleMenu();
        }}
        key="Get Started"
      >
        {t("menu.get-started")}
      </NavButton>
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
    </div>
  );

  const MobileLinks = () => (
    <div className="lg:flex">
      <NavButton
        onClick={() => {
          navigate("wallet?tutorial=onboarding");
          toggleMenu();
        }}
        key="Get Started"
      >
        {t("menu.get-started")}
      </NavButton>
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
    </div>
  );

  const Logo = () => (
    <Link to="/dashboard" className="flex items-center lg:ml-4">
      <img src={logo} alt="logo" className="mr-3 w-7 h-7" />
      <span className="font-bold">SMSWithoutBorders</span>
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
      <nav className="items-center justify-between hidden h-16 bg-white shadow-lg lg:flex">
        <Logo />
        <DesktopLinks />
        <ActionLinks />
      </nav>
      {/* Mobile nav */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg lg:hidden">
        <div className="flex items-center justify-between p-4">
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
            className="flex flex-col w-full h-screen bg-white"
          >
            <MobileLinks />
            <ActionLinks />
          </Transition>
        )}
      </nav>
    </Fragment>
  );
};
