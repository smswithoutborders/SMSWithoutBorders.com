import React from "react";
import { useTranslation } from "react-i18next";

export const Label = ({ required, children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <label className="text-sm leading-8 text-gray-600" {...rest}>
      <span>{children}</span>
      {required ? (
        <span className="ml-1 text-red-600">*</span>
      ) : (
        <span className="ml-1">({t("labels.optional")})</span>
      )}
    </label>
  );
};
