import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "utils/constants";
import PropTypes from "prop-types";

export const LanguageWrapper = ({ children }) => {
  const { i18n } = useTranslation();
  const { search } = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const lang = searchParams.get("lang");
    if (LANGUAGES.some((item) => item.key === lang)) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, search]);

  return children;
};

LanguageWrapper.propTypes = {
  children: PropTypes.node,
};
