// file for minimal components
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

export const ErrorMessage = ({ children, className, ...rest }) => {
  return (
    <small className={clsx("text-red-500 mt-2", className)} {...rest}>
      {children}
    </small>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
