import React from "react";
import tw from "twin.macro";
import "styled-components/macro";
import Logo from "images/logo-icon-light.png";
import { Link } from "react-router-dom";
import { FiMail, FiMessageSquare, FiLink2, FiGlobe } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";

const Container = tw.footer`flex flex-col lg:flex-row md:justify-between bg-gray-800 text-white py-8 px-2 md:p-8`;
const LogoIcon = tw.img`w-12 h-12 text-white p-2 rounded-full`;
const FooterLink = tw.p`text-gray-100 pl-14`;
const FooterNavLink = tw(Link)`font-medium inline-flex items-center text-gray-100 hocus:no-underline hocus:text-gray-100`;
const DescLink = tw.a`inline-flex items-center text-base text-gray-100 cursor-pointer mb-2 md:mb-4 hocus:no-underline hocus:text-blue-200`;
const NavContainer = tw.div`flex flex-col p-4 items-start`;

export const Footer = () => {
  return (
      <Container>
        <NavContainer tw="p-0 mb-4 md:mb-0">
          <FooterNavLink to="/">
            <LogoIcon src={Logo} alt="SMSwithoutborders" />
            <span className="ml-2 text-xl font-bold">SMSWithoutBorders</span>
          </FooterNavLink>

          <FooterLink>
            2021 - {new Date().getFullYear()}
            <DescLink
              tw="text-sm"
              href="https://github.com/afkanerd"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; Afkanerd
            </DescLink>
          </FooterLink>
        </NavContainer>

        <NavContainer>
          <DescLink
            href="https://smswithoutborders.github.io"
            target="_blank"
            rel="noreferrer"
          >
            <FiGlobe size={20} /> &nbsp; SWOB Blog
          </DescLink>
          <FooterNavLink
            tw="mb-2 md:mb-4 hocus:text-blue-200"
            to="/privacy-policy"
          >
            <FiLink2 size={20} /> &nbsp; Privacy Policy
          </FooterNavLink>
          <DescLink
            href="mailto:developers@smswithoutborders.com"
            target="_blank"
            rel="noreferrer"
          >
            <FiMail size={20} /> &nbsp; developers@smswithoutborders.com
          </DescLink>
        </NavContainer>

        <NavContainer>
          <DescLink>
            <FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd
          </DescLink>
          <DescLink
            href="https://github.com/smswithoutborders"
            target="_blank"
            rel="noreferrer"
          >
            <GoMarkGithub size={20} /> &nbsp; @smswithoutborders
          </DescLink>
        </NavContainer>
      </Container>
  );
};
