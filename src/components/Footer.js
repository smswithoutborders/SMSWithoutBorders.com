import React from "react";
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
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="flex flex-col px-2 py-8 overflow-y-auto text-sm text-gray-300 lg:flex-row md:justify-between bg-slate-900 md:p-8">
      <div className="flex flex-col p-4 space-y-2">
        <Link
          to="/"
          className="inline-flex items-center appearance-none hover:focus:text-blue-200 focus:no-underline"
        >
          <img
            src={Logo}
            alt="SMSwithoutborders"
            className="w-12 h-12 p-2 text-white rounded-full"
          />
          <span className="ml-2 text-xl font-bold text-white">
            SMSWithoutBorders
          </span>
        </Link>

        <p className="pl-14">
          2021 - {new Date().getFullYear()}
          <a
            className="inline-flex items-center mb-2 cursor-pointer md:mb-4 focus:hover:text-blue-200"
            href="https://github.com/afkanerd"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp; Afkanerd
          </a>
        </p>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        <Link
          className="inline-flex items-center hover:focus:text-blue-200"
          to="/privacy-policy"
        >
          <FiLink2 size={20} /> &nbsp; {t("menu.privacy")}
        </Link>
        <a
          className="inline-flex items-center hover:focus:text-blue-200"
          href="https://developers.smswithoutborders.com"
          target="_blank"
          rel="noreferrer"
        >
          <FiExternalLink size={20} /> &nbsp; {t("menu.developers")}
        </a>
        <a
          className="inline-flex items-center hover:focus:text-blue-200"
          href="mailto:developers@smswithoutborders.com"
          target="_blank"
          rel="noreferrer"
        >
          <FiMail size={20} /> &nbsp; developers@smswithoutborders.com
        </a>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        <p className="inline-flex items-center hover:focus:text-blue-200">
          <FiMessageSquare size={20} /> &nbsp; IRC: freenode/#afkanerd
        </p>
        <a
          className="inline-flex items-center hover:focus:text-blue-200"
          href="https://github.com/smswithoutborders"
          target="_blank"
          rel="noreferrer"
        >
          <GoMarkGithub size={20} /> &nbsp; @smswithoutborders
        </a>
      </div>
      <div>
        <LanguageSwitcher bordered />
      </div>
    </footer>
  );
};
