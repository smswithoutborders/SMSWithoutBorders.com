import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo-icon-light.png";
import { FiMenu as MenuIcon, FiX as CloseIcon } from "react-icons/fi";
import { Link } from 'react-router-dom';

const MainHeader = tw.header`flex justify-between items-center bg-gray-100`;
const NavLinks = tw.div`inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(Link)`inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-gray-100 hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-row items-center`;
const MobileNavContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden focus:outline-none transition duration-300`;

const MobileNav = motion(styled.div`
  ${tw`lg:hidden z-40 fixed top-28 inset-x-4 p-2 border text-center rounded-lg text-white bg-gray-900 shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
  `);
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-gray-100`;
const Divider = tw.span`text-gray-900`;

const MainNavbar = () => {

    let collapseBreakpointClass = "lg"
    const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
    const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

    const defaultLinks = [
        <React.Fragment key="nav">
            <NavLinks key={1}>
                <NavLink onClick={toggleNavbar} key="privacy-policy" to="/privacy-policy">Privacy Policy</NavLink>
                <ExtLink onClick={toggleNavbar} key="Github" href="https://github.com/orgs/smswithoutborders/" target="_blank">Github</ExtLink>
            </NavLinks>
            <UserActions key={2}>
                <NavLink key="login" to="/login" onClick={toggleNavbar}>
                    <FiLogIn size={16} /> &nbsp; Log In
                </NavLink>
                <Divider>|</Divider>
                <NavLink key="sign-up" to="/sign-up" onClick={toggleNavbar}>
                    <FiUserPlus size={16} /> &nbsp; Sign Up
                </NavLink>
            </UserActions>
        </React.Fragment>
    ];

    const defaultLogoLink = (
        <LogoLink to="/">
            <img src={logo} alt="logo" />
            <span>SMSwithoutborders</span>
        </LogoLink>
    );

    return (
        <>
            <MainHeader>
                <DesktopNav css={collapseBreakpointCss.desktopNavLinks}>
                    {defaultLogoLink}
                    {defaultLinks}
                </DesktopNav>
                <MobileNavContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
                    {defaultLogoLink}
                    <MobileNav initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
                        {defaultLinks}
                    </MobileNav>
                    <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
                        {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
                    </NavToggle>
                </MobileNavContainer>
            </MainHeader>
        </>
    );
};

const collapseBreakPointCssMap = {
    sm: {
        mobileNavLinks: tw`sm:hidden`,
        desktopNavLinks: tw`sm:flex`,
        mobileNavLinksContainer: tw`sm:hidden`
    },
    md: {
        mobileNavLinks: tw`md:hidden`,
        desktopNavLinks: tw`md:flex`,
        mobileNavLinksContainer: tw`md:hidden`
    },
    lg: {
        mobileNavLinks: tw`lg:hidden`,
        desktopNavLinks: tw`lg:flex`,
        mobileNavLinksContainer: tw`lg:hidden`
    },
    xl: {
        mobileNavLinks: tw`lg:hidden`,
        desktopNavLinks: tw`lg:flex`,
        mobileNavLinksContainer: tw`lg:hidden`
    }
};

export default MainNavbar;