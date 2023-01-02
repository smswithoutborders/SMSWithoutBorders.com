import React, { forwardRef, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink as BaseNavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useScroll } from "hooks";

export const NavLink = forwardRef(({ className, ...props }, ref) => {
  const scrolled = useScroll();

  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none p-5 gap-2",
          isActive && !scrolled && "border-b-2 border-white text-white",
          isActive && scrolled && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

NavLink.displayName = "NavLink";
NavLink.propTypes = {
  className: PropTypes.string,
};

export const DashNavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none p-5 gap-2",
          isActive && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

DashNavLink.displayName = "DashNavLink";
DashNavLink.propTypes = {
  className: PropTypes.string,
};

export const MobileNavLink = forwardRef(({ className, ...props }, ref) => {
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        clsx(
          "flex items-center outline-none appearance-none p-5 lg:p-0 gap-2",
          isActive && "border-b-2 border-blue-800 text-blue-800",
          className
        )
      }
    />
  );
});

MobileNavLink.displayName = "MobileNavLink";
MobileNavLink.propTypes = {
  className: PropTypes.string,
};

export const ExternalLink = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          "flex outline-none items-center appearance-none active:font-bold p-5 lg:p-0 gap-2",
          className
        )}
      >
        {children}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";
ExternalLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const DropDownLink = forwardRef(({ label, links, ...rest }, ref) => {
  return (
    <Menu ref={ref} {...rest} as="div" className="relative">
      <Menu.Button className="flex items-center p-5 space-x-1 outline-none appearance-none active:font-bold md:px-3">
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
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {links?.map(({ key, path, label, external }) => (
            <Menu.Item key={key}>
              {external ? (
                <a
                  key={key}
                  href={path}
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center p-5 text-gray-900 outline-none appearance-none active:font-bold"
                >
                  {label}
                </a>
              ) : (
                <BaseNavLink
                  key={key}
                  to={`/${path}`}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center outline-none appearance-none p-5 gap-2",
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

DropDownLink.displayName = "DropDownLink";
DropDownLink.propTypes = {
  label: PropTypes.string,
  links: PropTypes.array,
};
