import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import "styled-components/macro";
import logo from "images/logo-icon-light.png";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { metricsSelector, resetStore, authSelector } from "features";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX, FiLogOut, FiGrid, FiSettings } from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { clearCache, clearPersistedState, useLogoutMutation } from "services";
import { Loader } from "./Loader";
import { DashNavLink, ExternalLink } from "./NavLinks";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const UserActions = tw.div`flex items-center mt-20 justify-between bg-gray-100 xl:(bg-white mt-0)`;
const MobileNav = tw.nav`xl:hidden z-50 bg-white sticky top-0 shadow-lg`;
const DesktopNav = tw.nav`hidden xl:flex  justify-between items-center bg-white h-16 shadow-lg`;
const NavButton = tw.button`flex text-gray-900 font-medium hocus:(font-bold) p-5 items-center appearance-none`;

export const DashNavbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metrics = useSelector(metricsSelector);
  const auth = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  // helper function for menu toggle and logout
  function toggleMenu() {
    setOpen(!open);
  }

  async function handleLogOut() {
    try {
      await logout(auth).unwrap();
      // clear local cache if any
      clearCache();
      clearPersistedState();
      // clear store
      dispatch(resetStore());
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
    <UserActions key={2}>
      {metrics?.name && (
        <div onClick={() => toggleMenu()}>
          <div className="flex items-center px-4 lg:px-0">
            <div className="flex items-center justify-center mr-2 bg-blue-800 rounded-full w-9 h-9">
              <p className="font-bold text-center text-white">
                {metrics?.name.charAt(0)}
              </p>
            </div>
            <p className="mr-4 lg:hidden">{metrics?.name}</p>
          </div>
        </div>
      )}
      <NavButton onClick={() => handleLogOut()}>
        <FiLogOut /> &nbsp; {t("menu.logout")}
      </NavButton>
    </UserActions>
  );

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
    <Link to="/" className="flex items-center xl:ml-4">
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
