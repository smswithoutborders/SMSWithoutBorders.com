import React from "react";
import tw from "twin.macro";
import "styled-components/macro";
import Logo from "images/logo-icon-light.png";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiMessageSquare,
  FiLink2,
  FiExternalLink,
} from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import { useTranslation } from "react-i18next";

const LogoIcon = tw.img`w-12 h-12 text-white p-2 rounded-full`;
const FooterLink = tw.p`text-gray-100 pl-14`;
const FooterNavLink = tw(
  Link
)`font-medium inline-flex items-center text-gray-100 hocus:no-underline hocus:text-gray-100`;
const ExternalLink = tw.a`inline-flex items-center text-base text-gray-100 cursor-pointer mb-2 md:mb-4 hocus:no-underline hocus:text-blue-200`;
const NavContainer = tw.div`flex flex-col p-4 items-start`;

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="flex flex-col px-2 py-8 text-white lg:flex-row md:justify-between bg-slate-900 md:p-8">
      <NavContainer tw="p-0 mb-4 md:mb-0">
        <FooterNavLink to="/">
          <LogoIcon src={Logo} alt="SMSwithoutborders" />
          <span className="ml-2 text-xl font-bold">SMSWithoutBorders</span>
        </FooterNavLink>

        <FooterLink>
          2021 - {new Date().getFullYear()}
          <ExternalLink
            tw="text-sm"
            href="https://github.com/afkanerd"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp; Afkanerd
          </ExternalLink>
        </FooterLink>
      </NavContainer>

      <NavContainer>
        <FooterNavLink
          tw="mb-2 md:mb-4 hocus:text-blue-200"
          to="/privacy-policy"
        >
          <FiLink2 size={20} /> &nbsp; {t("menu.privacy")}
        </FooterNavLink>
        <ExternalLink
          href="https://developers.smswithoutborders.com"
          target="_blank"
          rel="noreferrer"
        >
          <FiExternalLink size={20} /> &nbsp; {t("menu.developers")}
        </ExternalLink>
        <ExternalLink
          href="mailto:developers@smswithoutborders.com"
          target="_blank"
          rel="noreferrer"
        >
          <FiMail size={20} /> &nbsp; developers@smswithoutborders.com
        </ExternalLink>
      </NavContainer>

      <NavContainer>
        <ExternalLink>
          <FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd
        </ExternalLink>
        <ExternalLink
          href="https://github.com/smswithoutborders"
          target="_blank"
          rel="noreferrer"
        >
          <GoMarkGithub size={20} /> &nbsp; @smswithoutborders
        </ExternalLink>
      </NavContainer>
    </footer>
  );
};
