import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import logo from "images/logo-icon-light.png";
import { FiMenu, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { SideSheet } from "evergreen-ui";

const MainHeader = tw.header`flex justify-between items-center bg-white shadow-lg`;
const NavContainer = tw.div`block md:inline-flex`;
const NavButton = tw.button`h-16 items-center transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline appearance-none`;
const NavLink = tw(Link)`w-full md:w-max inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const ExtLink = tw.a`w-full md:w-max inline-flex h-16 transition duration-300 hocus:bg-gray-700 hocus:outline-none hocus:text-white text-gray-900 font-medium  px-6 py-3 no-underline items-center hocus:no-underline appearance-none`;
const LogoLink = styled(NavLink)`
  ${tw`inline-flex items-center ml-0! hocus:bg-white hocus:text-gray-900 font-bold text-xl`};
  img {
    ${tw`w-8 h-8 mr-3`}
  }
`;
const UserActions = tw.div`flex flex-col md:flex-row items-center`;
const MobileNav = tw.nav`lg:hidden flex flex-1 items-center justify-between`;
const NavToggle = tw(NavButton)`lg:hidden focus:outline-none transition duration-300 hocus:bg-white hocus:text-gray-900`;
const DesktopNav = tw.nav`hidden lg:flex flex-1 justify-between items-center bg-white`;
const Divider = tw.span`hidden lg:block text-gray-900`;

const MainNavbar = () => {


    const [open, setOpen] = useState(false);

    const defaultLinks = (
        <React.Fragment key="nav">
            <NavContainer key={1}>
                <NavLink key="privacy-policy" to="/privacy-policy">Privacy Policy</NavLink>
                <ExtLink key="Github" href="https://github.com/orgs/smswithoutborders/" target="_blank">Github</ExtLink>
            </NavContainer>
        </React.Fragment>
    );

    const actionLinks = (
        <UserActions key={2}>
            <NavLink key="login" to="/login">
                <FiLogIn size={20} /> &nbsp; Log In
            </NavLink>
            <Divider>|</Divider>
            <NavLink key="sign-up" to="/sign-up">
                <FiUserPlus size={20} /> &nbsp; Sign Up
            </NavLink>
        </UserActions>
    );

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
                    <NavToggle onClick={() => setOpen(!open)}>
                        <FiMenu size={24} />
                    </NavToggle>
                </MobileNav>
            </MainHeader>


            <SideSheet
                width={300}
                isShown={open}
                onCloseComplete={() => setOpen(!open)}
            >
                {defaultLinks}
                {actionLinks}
            </SideSheet>
        </>
    );
};



export default MainNavbar;