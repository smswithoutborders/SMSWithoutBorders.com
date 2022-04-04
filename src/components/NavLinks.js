import React, { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import clsx from "clsx";

export const NavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center p-5 outline-none appearance-none",
          isActive && "font-medium border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

export const ExternalLink = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          "flex outline-none text-gray-900 font-medium p-5 items-center appearance-none active:font-bold",
          className
        )}
      >
        {children}
      </a>
    );
  }
);
