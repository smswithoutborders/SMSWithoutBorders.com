import React from "react";
import { MainNavbar, Footer } from "components";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const Website = () => {
  const { pathname } = useLocation();
  return (
    <div className="bg-fixed bg-gradient-to-br from-blue-800 via-blue-400 to-blue-800">
      <MainNavbar />
      <div
        className={clsx(
          pathname.includes("verify") || pathname.includes("reset")
            ? "bg-white"
            : ""
        )}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Website;
