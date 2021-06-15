import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiX, FiLogIn, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { SideSheet } from "evergreen-ui";

const MainHeader = tw.header`flex justify-between items-center bg-gray-100`;
const NavLinks = tw.div`block md:inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(Link)`w-full md:w-max inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`w-full md:w-max inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-gray-100 hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-col md:flex-row items-center`;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden focus:outline-none transition duration-300 hocus:bg-gray-100 hocus:text-gray-900`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-gray-100`;
const Divider = tw.span`hidden lg:block text-gray-900`;

const MainNavbar = () => {

    const { showNavLinks, toggleNavbar } = useAnimatedNavToggler();

    const defaultLinks = (
        <React.Fragment key="nav">
            <NavLinks key={1}>
                <NavLink onClick={toggleNavbar} key="privacy-policy" to="/privacy-policy">Privacy Policy</NavLink>
                <ExtLink onClick={toggleNavbar} key="Github" href="https://github.com/orgs/smswithoutborders/" target="_blank">Github</ExtLink>
            </NavLinks>
        </React.Fragment>
    );

    const actionLinks = (
        <UserActions key={2}>
            <NavLink key="login" to="/login" onClick={toggleNavbar}>
                <FiLogIn size={20} /> &nbsp; Log In
            </NavLink>
            <Divider>|</Divider>
            <NavLink key="sign-up" to="/sign-up" onClick={toggleNavbar}>
                <FiUserPlus size={20} /> &nbsp; Sign Up
            </NavLink>
        </UserActions>
    )

    const defaultLogoLink = (
        <LogoLink to="/">
            <img src={logo} alt="logo" />
            <span>SMSwithoutborders</span>
        </LogoLink>
    );

    return (
        <>
            <MainHeader>
                <DesktopNav>
                    {defaultLogoLink}
                    {defaultLinks}
                    {actionLinks}
                </DesktopNav>
                <MobileNav>
                    {defaultLogoLink}
                    <NavToggle onClick={toggleNavbar}>
                        {/* {showNavLinks ? <FiMenu size={24} /> : <FiX size={24} />} */}
                        <FiMenu size={24} />
                    </NavToggle>
                </MobileNav>
            </MainHeader>


            <SideSheet
                width={300}
                isShown={showNavLinks}
                onCloseComplete={() => toggleNavbar()}
            >
                {defaultLinks}
                {actionLinks}
            </SideSheet>
        </>
    );
};



export default MainNavbar;