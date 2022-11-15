import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useController } from "react-hook-form";

export const Checkbox = ({ name, className, control, ...rest }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <input
      {...field}
      type="checkbox"
      className={clsx(
        "rounded border-gray-400 text-blue-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 p-2.5",
        error
          ? "border-2 border-red-600 focus:border-red-600"
          : "border-2 border-gray-300 focus:border-blue-800"
      )}
      {...rest}
    />
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
};
