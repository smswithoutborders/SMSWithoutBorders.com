import React, { Fragment } from "react";
import PropTypes from "prop-types";
import GmailAuthScreen from "images/gmail-auth-screen.png";
import { useTranslation } from "react-i18next";

// component for displaying additional platform information
const Info = ({ platform }) => {
  const views = {
    gmail: Gmail,
  };

  const InfoView = views[platform] ?? null;

  if (!InfoView) return null;
  return <InfoView />;
};

const Gmail = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h3>{t("wallet.labels.how-to-save")}</h3>
      <p>{t("wallet.info.gmail")}</p>
      <img src={GmailAuthScreen} alt="Gmail auth screen" />
    </Fragment>
  );
};

Info.propTypes = {
  platform: PropTypes.string,
};
export default Info;
