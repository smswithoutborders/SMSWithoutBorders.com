import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";
import logo from "images/logo-icon-light.png";
import { useTranslation } from "react-i18next";

const LoadingContainer = styled.div.attrs(({ className, light }) => ({
  role: "alert",
  "aria-busy": true,
  className: clsx(
    "grid place-items-center mx-auto w-full",
    light ? "text-white" : "text-gray-600",
    className
  ),
}))``;

const Spinner = styled.div.attrs(({ className, light }) => ({
  className: clsx(
    "animate-spin rounded-full h-16 w-16 border-b-2",
    light ? "border-white" : "border-gray-600",
    className
  ),
}))``;

export const Loader = ({ message, light }) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingContainer className="h-full min-h-screen" light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
        <p className="mt-2">{message || t("alert-messages.loading")}</p>
      </div>
    </LoadingContainer>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
  light: PropTypes.bool,
};

export const InlineLoader = ({ message, className, light }) => {
  const { t } = useTranslation();

  // restore scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingContainer className={className} light={light}>
      <div>
        <Spinner className="mx-auto" light={light} />
        <p className="mt-2 text-sm">{message || t("alert-messages.loading")}</p>
      </div>
    </LoadingContainer>
  );
};

InlineLoader.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  light: PropTypes.bool,
};

export const SplashScreen = () => {
  return (
    <LoadingContainer className="h-screen">
      <div dir="ltr" className="flex items-center gap-4 text-xl animate-pulse">
        <img className="w-12 h-12 md:w-20 md:h-20" src={logo} alt="logo" />
        <h1 className="text-2xl font-black md:text-4xl">SMSWithoutBorders</h1>
      </div>
    </LoadingContainer>
  );
};
