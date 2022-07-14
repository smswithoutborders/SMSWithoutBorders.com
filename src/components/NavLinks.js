import React, { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export const NavLink = forwardRef(({ scrolled, className, ...props }, ref) => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language === "fr";
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none",
          isFrench ? "md:px-3 py-5" : "p-5",
          isActive && !scrolled && "border-b-2 border-white text-white",
          isActive && scrolled && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

export const DashNavLink = forwardRef(({ className, ...props }, ref) => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language === "fr";
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none",
          isFrench ? "md:px-3 py-5" : "p-5",
          isActive && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

export const MobileNavLink = forwardRef(
  ({ scrolled, className, ...props }, ref) => {
    const { i18n } = useTranslation();
    const isFrench = i18n.language === "fr";
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          clsx(
            "flex items-center outline-none appearance-none",
            isFrench ? "md:px-3 py-5" : "p-5",
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
    const { i18n } = useTranslation();
    const isFrench = i18n.language === "fr";
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          "flex outline-none items-center appearance-none active:font-bold",
          isFrench ? "md:px-3 py-5" : "p-5",
          className
        )}
      >
        {children}
      </a>
    );
  }
);
