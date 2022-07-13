import React, { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import clsx from "clsx";

export const NavLink = forwardRef(({ scrolled, className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center p-5 outline-none appearance-none",
          isActive &&
            !scrolled &&
            "border-b-2 border-white text-white",
          isActive &&
            scrolled &&
            "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

export const DashNavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center p-5 outline-none appearance-none",
          isActive && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

export const MobileNavLink = forwardRef(
  ({ scrolled, className, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          clsx(
            "flex items-center p-5 outline-none appearance-none",
            isActive && "border-b-2 border-blue-800 text-blue-800",
            className
          )
        }
      />
    );
  }
);

export const ExternalLink = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          "flex outline-none p-5 items-center appearance-none active:font-bold",
          className
        )}
      >
        {children}
      </a>
    );
  }
);
