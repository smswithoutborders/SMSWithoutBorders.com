import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import useAnimatedNavToggler from "helpers/useAnimatedNavToggler.js";
import logo from "images/logo-icon-dark.png";
import swobLogo from "images/logo.png";
import { motion } from "framer-motion";
import { Avatar, LogOutIcon, Dialog } from "evergreen-ui";
import { FiMenu as MenuIcon, FiX as CloseIcon, FiBell, FiInfo } from "react-icons/fi";
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppContext } from "App";


const MainHeader = tw.header`flex justify-between items-center bg-gray-900`;
const NavLinks = tw.div`inline-block`;
const NavButton = tw.button`h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-white font-medium  px-6 py-3 no-underline items-center appearance-none`;
const NavLink = tw(Link)`inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-white font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const LogoLink = styled(NavButton)`
  ${tw`inline-flex items-center ml-0! bg-primary-900 focus:bg-primary-900`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-row items-center`;
const UserActionsButton = tw(NavButton)`flex flex-row items-center px-4 mx-auto`;
const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden focus:outline-none transition duration-300`;
const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-40 fixed top-28 inset-x-4 p-2 border text-center rounded-lg text-white bg-gray-900 shadow-2xl`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
  `);
const DesktopNavLinks = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-gray-900`;
const AboutLogo = tw.img`w-60`;
const AboutContainer = tw.div`flex flex-wrap items-center flex-col md:flex-row justify-between mx-auto p-2`;
const AboutDetails = tw.div``;



const Navbar = () => {
    const { path } = useRouteMatch();
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const { state, handleLogOut } = useAppContext();
    const { userProfile } = state;

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
                <UserActionsButton onClick={() => {
                    toggleNavbar();
                    setIsAboutOpen(!isAboutOpen)
                }}>
                    <FiInfo size={20} />
                </UserActionsButton>
                <UserActionsButton onClick={toggleNavbar}>
                    <FiBell size={20} />
                </UserActionsButton>
                {userProfile ? (
                    <UserActionsButton>
                        <Avatar name={userProfile?.name} size={34} />
                    </UserActionsButton>
                ) : (null)
                }
                <UserActionsButton onClick={() => { toggleNavbar(); handleLogOut() }}>
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

            <Dialog
                isShown={isAboutOpen}
                title="About"
                onCloseComplete={() => setIsAboutOpen(false)}
                hasFooter={false}
            >
                <AboutContainer>
                    <AboutLogo src={swobLogo} alt="SMSwithoutborders logo" />
                    <AboutDetails>
                        <h3><strong>SMSwithoutBorders User</strong></h3>
                        <br />
                        <div>
                            <p>Version number</p>
                            <p>1.0.0</p>
                        </div>
                    </AboutDetails>
                </AboutContainer>
            </Dialog>
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