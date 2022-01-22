import React, { useState, Fragment } from "react";
import tw from "twin.macro";
import "styled-components/macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import { Link } from "react-router-dom";
import { profileSelector, resetStore } from "features";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { clearCache } from "services";
import toast from "react-hot-toast";

const NavLink = tw(
  Link
)`flex hocus:outline-none text-gray-900 font-medium hocus:font-bold p-5 items-center appearance-none`;
const ExtLink = tw.a`flex hocus:outline-none text-gray-900 font-medium hocus:font-bold p-5 items-center appearance-none`;
const StartedExtLink = tw(ExtLink)`text-primary-800 font-medium`;
const LogoLink = styled(Link)`
  ${tw`flex items-center text-xl font-bold lg:ml-4`};
  img {
    ${tw`w-10 h-10 mr-3`}
  }
`;
const UserActions = tw.div`flex items-center mt-20 justify-between bg-gray-100 lg:(bg-white mt-0)`;
const NavContainer = tw.div`lg:flex`;
const MobileNav = tw.nav`lg:hidden z-50 bg-white sticky top-0 shadow-lg`;
const DesktopNav = tw.nav`hidden lg:flex  justify-between items-center bg-white h-16 shadow-lg`;
const NavButton = tw.button`flex text-gray-900 font-medium hocus:(font-bold) p-5 items-center appearance-none`;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  // helper function for menu toggle and logout
  function toggleMenu() {
    setOpen(!open);
  }

  function handleLogOut() {
    // clear store
    dispatch(resetStore());
    // clear local cache if any
    clearCache();
    toast.success("Logout successfull");
  }

  const actionLinks = (
    <UserActions key={2}>
      {profile.name && (
        <div onClick={() => toggleMenu()}>
          <div className="flex items-center px-4 lg:px-0">
            <div className="flex items-center justify-center mr-2 bg-blue-800 rounded-full w-9 h-9">
              <p className="font-bold text-center text-white">
                {profile?.name.charAt(0)}
              </p>
            </div>
            <p className="mr-4 lg:hidden">{profile?.name}</p>
          </div>
        </div>
      )}
      <NavButton onClick={() => handleLogOut()}>
        <FiLogOut /> &nbsp; Logout
      </NavButton>
    </UserActions>
  );

  const defaultLinks = (
    <NavContainer>
      <StartedExtLink
        onClick={() => toggleMenu()}
        key="Get Started"
        href="https://smswithoutborders.github.io/docs/intro"
        target="_blank"
      >
        Get Started
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
  );

  const defaultLogoLink = (
    <LogoLink to="/">
      <img src={logo} alt="logo" />
      <span>SMSwithoutborders</span>
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
