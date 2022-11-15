// file for minimal components
import React from "react";
import clsx from "clsx";

export const ErrorMessage = ({ children, className, ...rest }) => {
  return (
    <small className={clsx("text-red-500 mt-2", className)} {...rest}>
      {children}
    </small>
  );
};
