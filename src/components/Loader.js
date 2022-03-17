import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";
import logo from "images/logo-icon-light.png";
import { useTranslation } from "react-i18next";

const LoadingContainer = styled.div.attrs(({ className }) => ({
  className: clsx(
    "grid place-items-center text-gray-600 mx-auto w-full",
    className
  ),
}))``;

const Spinner = styled.div.attrs(({ className }) => ({
  className: clsx(
    "animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mb-4",
    className
  ),
}))``;

export const Loader = ({ message }) => {
  const { t } = useTranslation();
  return (
    <LoadingContainer className="h-screen">
      <div>
        <Spinner className="mx-auto" />
        <p className="mt-2">{message || t("alert-messages.loading")}</p>
      </div>
    </LoadingContainer>
  );
};

export const InlineLoader = ({ message, className }) => {
  const { t } = useTranslation();
  return (
    <LoadingContainer className={clsx("h-80", className)}>
      <div>
        <Spinner className="mx-auto" />
        <p className="mt-2">{message || t("alert-messages.loading")}</p>
      </div>
    </LoadingContainer>
  );
};

export const SplashScreen = () => {
  return (
    <LoadingContainer className="h-screen">
      <div className="flex items-center text-xl animate-pulse">
        <img className="w-12 h-12 mr-3 md:w-20 md:h-20" src={logo} alt="logo" />
        <h1 className="text-2xl font-black md:text-4xl">SMSWithoutBorders</h1>
      </div>
    </LoadingContainer>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
};

InlineLoader.propTypes = {
  message: PropTypes.string,
};
