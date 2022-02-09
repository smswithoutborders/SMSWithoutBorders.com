import React from "react";
import clsx from "clsx";
import { FiUser, FiTrash2, FiSettings } from "react-icons/fi";
import { useTitle, PageAnimationWrapper } from "components";
import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
  useTitle("Settings");

  return (
    <PageAnimationWrapper>
      <div className="max-w-screen-xl min-h-screen p-8 mx-auto my-10 prose text-gray-900">
        <div className="inline-flex items-center mb-12">
          <FiSettings size={56} />
          <div className="ml-4">
            <h1 className="mb-0 text-4xl font-bold ">Settings</h1>
            <p className="my-0 text-lg">Manage your account</p>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="flex col-span-full lg:col-span-3 justify-evenly lg:block">
            <NavLink
              className={({ isActive }) =>
                clsx(
                  "inline-flex items-center w-full h-16 p-2 mb-2 text-xs font-medium no-underline transition duration-300 bg-gray-100 appearance-none hover:bg-blue-800 hover:outline-none hover:text-white md:text-sm md:p-4",
                  isActive ? "text-white bg-blue-800" : "text-gray-900"
                )
              }
              to="change-password"
            >
              <FiUser size={20} className="mr-2" /> Password Change
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  "inline-flex items-center w-full h-16 p-2 mb-2 text-xs font-medium  no-underline transition duration-300 bg-gray-100 appearance-none hover:bg-blue-800 hover:outline-none hover:text-white md:text-sm md:p-4",
                  isActive ? "text-white bg-blue-800" : "text-gray-900"
                )
              }
              to="delete-account"
            >
              <FiTrash2 size={20} className="mr-2" /> Delete Account
            </NavLink>
          </div>

          <div className="col-span-full lg:col-span-9 md:my-0">
            <Outlet />
          </div>
        </div>
      </div>
    </PageAnimationWrapper>
  );
};

export default Settings;
