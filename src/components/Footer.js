import React from 'react';
import tw from "twin.macro";
import Logo from "images/logo-icon-light.png";
import { Link } from "react-router-dom";
import { FiMail, FiMessageSquare, FiLink2 } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";

const Container = tw.footer`flex flex-col md:flex-row md:justify-between bg-white p-8`;
const LogoIcon = tw.img`w-12 h-12 text-white p-2 rounded-full`;
const FooterLink = tw.p`text-gray-900 pl-6`;
const FooterNavLink = tw(Link)`font-medium inline-flex items-center text-gray-900 hocus:no-underline hocus:text-gray-900`;
const DescLink = tw.a`inline-flex items-center text-base text-gray-900 cursor-pointer md:mb-4`;
const NavContainer = tw.div`flex flex-col p-4 items-start`;

const Footer = () => {
    return (
        <>
            <Container>
                <NavContainer tw="p-0 mb-4 md:mb-0">
                    <FooterNavLink to="/">
                        <LogoIcon src={Logo} alt="SMSwithoutborders" />
                        <span tw="ml-2 text-xl font-bold">SMSwithoutborders</span>
                    </FooterNavLink>

                    <FooterLink>
                        &copy; {new Date().getFullYear()} Powered by &nbsp; <a href="https://afkanerd.io" target="_blank" rel="noreferrer">Afkanerd</a>
                    </FooterLink>

                </NavContainer>

                <NavContainer>
                    <DescLink to="/privacy-policy"><FiLink2 size={20} /> &nbsp; Privacy Policy</DescLink>
                    <DescLink href="mailto:info@smswithoutborders.com" target="_blank" rel="noreferrer"><FiMail size={20} /> &nbsp; info@smswithoutborders.com</DescLink>
                </NavContainer>

                <NavContainer>
                    <DescLink><FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd</DescLink>
                    <DescLink href="https://github.com/smswithoutborders" target="_blank" rel="noreferrer"><GoMarkGithub size={20} /> &nbsp; @smswithoutborders</DescLink>
                </NavContainer>

            </Container>
        </>
    )
}

export default Footer;