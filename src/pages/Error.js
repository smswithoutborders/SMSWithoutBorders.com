import React from "react";
import { PageAnimationWrapper, Button } from "components";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Error = ({ title, message, callBack }) => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-8 mx-auto prose text-gray-900">
        <div className="mx-auto my-32">
          <h2>{title || t("error-messages.general-error-title")}</h2>
          <p>{message || t("error-messages.general-error-message")}</p>
          <Button onClick={() => callBack()}>{t("labels.try-again")}</Button>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  callBack: PropTypes.func.isRequired,
};

export default Error;
