import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";
import logo from "images/logo-icon-light.png";
import { useTranslation } from "react-i18next";

const LoadingContainer = styled.div.attrs(({ className, light }) => ({
  className: clsx(
    "grid place-items-center mx-auto w-full min-h-screen h-full",
    light ? "text-white" : "text-gray-600",
    className
  ),
}))``;

const Spinner = styled.div.attrs(({ className, light }) => ({
  className: clsx(
    "animate-spin rounded-full h-16 w-16 border-b-2 mb-4",
    light ? " border-white" : " border-gray-600",
    className
  ),
}))``;

export const Loader = ({ message, light }) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingContainer className="h-screen" light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
        <p className="mt-2">{message || t("alert-messages.loading")}</p>
      </div>
    </LoadingContainer>
  );
};

export const InlineLoader = ({ message, className, light }) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingContainer className={clsx("h-80", className)} light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
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
