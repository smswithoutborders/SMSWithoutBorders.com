import React from "react";
import { PageAnimationWrapper, Button } from "components";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Error = ({ title, message, callBack }) => {
  const { t } = useTranslation();
  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-6 mx-auto my-10 prose text-gray-900">
        <div className="max-w-screen-xl p-8 mx-auto my-24 prose">
          <h1 className="font-bold">{title || t("error-messages.general-error-title")}</h1>
          <p className="text-xl">{message}</p>
          <Button onClick={() => callBack()}>{t("labels.try-again")}</Button>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default Error;
