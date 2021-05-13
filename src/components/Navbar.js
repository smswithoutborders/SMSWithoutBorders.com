import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { Avatar, LogOutIcon } from "evergreen-ui";

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo-icon-dark.png";
import { FiMenu as MenuIcon, FiX as CloseIcon, FiBell, FiInfo } from "react-icons/fi";
import { Link, useRouteMatch } from 'react-router-dom';
import { Modal, ModalBody, } from 'carbon-components-react';
import { logOut } from "services/auth.service";


const MainHeader = tw.header`flex justify-between items-center bg-gray-900`;
const NavLinks = tw.div`inline-block`;
const NavButton = tw.button`h-16 transition duration-300 focus:bg-gray-800 text-white font-medium hover:bg-gray-700 hover:text-white px-6 py-3 no-underline items-center`;
const NavLink = tw(Link)`h-16 transition duration-300 focus:bg-gray-800 text-white font-medium hover:bg-gray-700 hover:text-white px-6 py-3 no-underline items-center`;
const LogoLink = styled(NavButton)`
  ${tw`flex items-center ml-0!`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-row items-center`;
const UserActionsButton = tw(NavButton)`flex flex-row items-center px-4 mx-auto`;
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden z-50 focus:outline-none transition duration-300`;
const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-50 fixed top-28 inset-x-4 p-2 border text-center rounded-lg text-white bg-gray-900 shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
  `);
const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-gray-900`;

const Navbar = () => {
    const { path } = useRouteMatch();
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    let collapseBreakpointClass = "lg"
    const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
    const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

    const defaultLinks = [
        <React.Fragment key="nav">
            <NavLinks key={1}>
                <NavLink onClick={toggleNavbar} key="Profile" to={`${path}/profile`}>Profile</NavLink>
                <NavLink onClick={toggleNavbar} key="Wallet" to={`${path}/wallet`}>Wallet</NavLink>
            </NavLinks>
            <UserActions key={2}>
                <UserActionsButton onClick={() => setIsAboutOpen(!isAboutOpen)}>
                    <FiInfo size={20} />
                </UserActionsButton>
                <UserActionsButton><FiBell size={20} /></UserActionsButton>
                <UserActionsButton><Avatar name="User Name" size={34} /></UserActionsButton>
                <UserActionsButton onClick={() => { toggleNavbar(); logOut() }}>
                    <LogOutIcon /> &nbsp; Logout
                </UserActionsButton>
            </UserActions>
        </React.Fragment>
    ];

    const defaultLogoLink = (
        <LogoLink>
            <img src={logo} alt="logo" />
            <span>SMSwithoutborders</span>
        </LogoLink>
    );

    return (
        <>
            <MainHeader>
                <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
                    {defaultLogoLink}
                    {defaultLinks}
                </DesktopNavLinks>
                <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
                    {defaultLogoLink}
                    <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
                        {defaultLinks}
                    </MobileNavLinks>
                    <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
                        {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
                    </NavToggle>
                </MobileNavLinksContainer>
            </MainHeader>
            <Modal
                open={isAboutOpen}
                modalLabel="About"
                modalAriaLabel="About Deku SMS Manager"
                passiveModal
                onRequestClose={() => setIsAboutOpen(!isAboutOpen)}>

                <ModalBody>
                    <div className="header-group">
                        <FiBell className="dash-centered-icon" /><span>SMSwithoutBorder</span>
                    </div>
                    <br />
                    <h3><strong>SMSwithoutBorders User</strong></h3>
                    <br />
                    <div className="version-number">
                        <p>Version number</p>
                        <p>1.0.0</p>
                    </div>
                </ModalBody>

            </Modal>
        </>
    );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

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

export default Navbar;