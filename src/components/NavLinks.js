import React, { forwardRef, Fragment } from "react";
import clsx from "clsx";
import { NavLink as BaseNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export const NavLink = forwardRef(({ scrolled, className, ...props }, ref) => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language === "fr";
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none p-5",
          isFrench && "md:px-3",
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
          "flex items-center outline-none appearance-none p-5",
          isFrench && "md:px-3",
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
            "flex items-center outline-none appearance-none p-5",
            isFrench && "md:px-3",
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
          "flex outline-none items-center appearance-none active:font-bold p-5",
          isFrench && "md:px-3",
          className
        )}
      >
        {children}
      </a>
    );
  }
);

export const DropDownLink = forwardRef(({ label, links, ...rest }, ref) => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language === "fr";
  return (
    <Menu ref={ref} {...rest} as="div" className="relative">
      <Menu.Button
        className={clsx(
          "flex outline-none items-center space-x-1 appearance-none active:font-bold p-5",
          isFrench && "md:px-3"
        )}
      >
        {({ open }) => (
          <Fragment>
            <span>{label}</span>
            <FiChevronDown
              size={16}
              className={`pointer-events-none ${open && "rotate-180"}`}
              aria-hidden="true"
            />
          </Fragment>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {links?.map(({ key, path, label, external }) => (
            <Menu.Item>
              {external ? (
                <a
                  key={key}
                  href={path}
                  rel="noreferrer"
                  target="_blank"
                  className={clsx(
                    "flex outline-none items-center appearance-none active:font-bold text-gray-900 p-5",
                    isFrench && "md:px-3"
                  )}
                >
                  {label}
                </a>
              ) : (
                <BaseNavLink
                  key={key}
                  to={`/${path}`}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center outline-none appearance-none p-5",
                      isFrench && "md:px-3",
                      isActive
                        ? "border-b-2 border-blue-800 text-blue-800"
                        : "border-b-2 border-white text-gray-900"
                    )
                  }
                >
                  {label}
                </BaseNavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
