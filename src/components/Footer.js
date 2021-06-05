import React from 'react';
import tw from "twin.macro";
import Logo from "images/logo-icon-light.png";
import { Link } from "react-router-dom";

const Container = tw.footer`px-5 py-4 mx-auto flex items-center sm:flex-row flex-col text-gray-600 bg-gray-100`;
const LogoIcon = tw.img`w-12 h-12 text-white p-2 rounded-full`;
const FooterLink = tw.p`inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start`;
const FooterNavLink = tw(Link)`flex font-medium items-center md:justify-start justify-center text-gray-900 hocus:no-underline hocus:text-gray-900`;
const PrivacyLink = tw(Link)`text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 cursor-pointer`;
const Footer = () => {
    return (
        <Container>
            <FooterNavLink to="/">
                <LogoIcon src={Logo} alt="SMSwithoutborders" />
                <span tw="ml-2 text-base">SMSwithoutborders</span>
            </FooterNavLink>

            <PrivacyLink to="/privacy-policy">Privacy Policy</PrivacyLink>
            <FooterLink>
                &copy; {new Date().getFullYear()} Powered by &nbsp; <a href="https://afkanerd.io" target="_blank" rel="noreferrer">Afkanerd</a>
            </FooterLink>
        </Container>
    )
}

export default Footer;