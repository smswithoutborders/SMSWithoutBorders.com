import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const Button = ({ className, disabled, outline, children, ...rest }) => {
  return (
    <button
      className={clsx(
        "px-8 py-2 outline-none rounded-lg focus:outline-none justify-center inline-flex items-center",
        disabled
          ? "text-gray-500 bg-gray-200"
          : outline
          ? "bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-900 hover:text-white"
          : "text-white bg-blue-800 hover:bg-blue-900",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const NavButton = ({ className, children, ...rest }) => {
  return (
    <button
      className={clsx(
        "flex items-center p-5 outline-none appearance-none font-medium border-b-2 border-blue-800 text-blue-800",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({ to, className, children, ...rest }) => {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center justify-center px-4 py-2 text-white no-underline bg-blue-800 rounded-lg outline-none focus:outline-none hover:bg-blue-900",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
