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
          "flex items-center p-5 font-medium text-gray-900 outline-none appearance-none",
          isActive && "font-bold",
          className
        )
      }
    />
  );
});
