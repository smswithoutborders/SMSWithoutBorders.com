import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import swobLogo from "images/logo.png";
import { Avatar, LogOutIcon, Dialog, SideSheet } from "evergreen-ui";
import { FiMenu, FiInfo, FiSettings, FiUser, FiExternalLink } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppContext } from '~/App';

const MainHeader = tw.header`flex justify-between items-center bg-white shadow-lg`;
const NavContainer = tw.div`block lg:inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-primary-900 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(Link)`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-900 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`w-full lg:w-max inline-flex h-16 transition duration-300 hocus:bg-primary-300 hocus:outline-none text-gray-900 font-medium hocus:font-bold px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const StartedExtLink = tw(ExtLink)`text-primary-900 bg-primary-300 font-bold`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-white hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-col lg:flex-row items-center`;
const UserActionsButton = tw(NavButton)`w-full lg:w-max flex flex-row items-center px-6 py-3 md:px-4 `;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden focus:outline-none transition duration-300 hocus:bg-white hocus:text-gray-900`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-white`;
const AboutLogo = tw.img`w-60`;
const AboutContainer = tw.div`flex flex-wrap items-center flex-col md:flex-row`;
const AboutDetails = tw.div`text-gray-900`;



export const Navbar = () => {
    const { path } = useRouteMatch();
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const { state, handleLogOut } = useAppContext();
    const { userProfile } = state;


    const defaultLinks = [
        <React.Fragment key="nav">
            <NavContainer key={1}>
                <StartedExtLink onClick={() => setOpen(false)} key="Get Started" href="https://smswithoutborders.github.io/getting_started.html" target="_blank"><FiExternalLink size={20} /> &nbsp; Get Started</StartedExtLink>
                <NavLink onClick={() => setOpen(false)} key="Profile" to={`${path}/profile`}><FiUser size={20} /> &nbsp; Profile</NavLink>
                <NavLink onClick={() => setOpen(false)} key="Wallet" to={`${path}/wallet`}><IoWalletOutline size={20} /> &nbsp; Wallet(Store Access)</NavLink>
                <NavLink onClick={() => setOpen(false)} key="Settings" to={`${path}/settings`}><FiSettings size={20} /> &nbsp; Settings</NavLink>
            </NavContainer>
        </React.Fragment>
    ];

    const actionLinks = (
        <UserActions key={2}>
            <UserActionsButton onClick={() => setIsAboutOpen(!isAboutOpen)}>
                <FiInfo size={20} />
            </UserActionsButton>
            {userProfile ? (
                <UserActionsButton onClick={() => setOpen(false)}>
                    <Avatar name={userProfile?.name} size={34} />
                </UserActionsButton>
            ) : (null)
            }
            <UserActionsButton onClick={() => handleLogOut()}>
                <LogOutIcon /> &nbsp; Logout
            </UserActionsButton>
        </UserActions>
    );

    const mobileActionLinks = (
        <UserActions key={2}>
            <UserActionsButton onClick={() => { setOpen(false); setIsAboutOpen(!isAboutOpen) }}>
                <FiInfo size={20} /> &nbsp; About
            </UserActionsButton>
            {userProfile ? (
                <UserActionsButton tw="px-5 md:px-3"
                    onClick={() => setOpen(false)}
                >
                    <Avatar name={userProfile?.name} size={30} /> &nbsp; {userProfile?.name}
                </UserActionsButton>
            ) : (null)
            }
            <UserActionsButton onClick={() => handleLogOut()}>
                <LogOutIcon /> &nbsp; Logout
            </UserActionsButton>
        </UserActions>
    );


    const defaultLogoLink = (
        <LogoLink to="/dashboard">
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
                    <NavToggle onClick={() => setOpen(!open)}>
                        <FiMenu size={24} />
                    </NavToggle>
                </MobileNav>
            </MainHeader>
            <SideSheet
                width={300}
                isShown={open}
                onCloseComplete={() => setOpen(false)}
            >
                {defaultLinks}
                {mobileActionLinks}
            </SideSheet>

            <Dialog
                isShown={isAboutOpen}
                title="About"
                onCloseComplete={() => setIsAboutOpen(false)}
                hasFooter={false}
            >
                <AboutContainer>
                    <AboutLogo src={swobLogo} alt="SMSwithoutborders logo" />
                    <AboutDetails>
                        <h3 tw="text-xl font-bold mb-2">SMSwithoutBorders</h3>
                        <p tw="text-base">Version number</p>
                        <p tw="text-base">1.0.0</p>
                    </AboutDetails>
                </AboutContainer>
            </Dialog>
        </>
    );
};
