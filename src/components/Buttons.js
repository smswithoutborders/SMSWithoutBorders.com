import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({
  className,
  disabled,
  outline,
  danger,
  children,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "px-8 py-3 outline-none rounded-lg focus:outline-none justify-center inline-flex gap-2 items-center",
        disabled
          ? "text-gray-600 bg-gray-200 border border-gray-200"
          : outline
          ? "bg-transparent border border-blue-800 text-blue-800"
          : danger
          ? "bg-red-600 hover:bg-red-600 text-white border-red-600 hover:border-red-600"
          : "text-white bg-blue-800 border border-blue-800",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node,
};

export const NavButton = ({ className, children, ...rest }) => {
  return (
    <button
      className={clsx(
        "flex items-center p-5 gap-2 appearance-none font-medium focus:border-b-2 focus:border-blue-800 focus:text-blue-800",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

NavButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const LinkButton = ({ to, className, children, ...rest }) => {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-2 justify-center px-4 py-3 text-white no-underline bg-blue-800 rounded-lg outline-none focus:outline-none",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
