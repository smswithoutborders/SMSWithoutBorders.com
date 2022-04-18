import React from "react";
import { MainNavbar, Footer } from "components";
import { Outlet } from "react-router-dom";

const Website = () => {
  return (
    <div className="bg-fixed bg-gradient-to-br from-blue-800 via-blue-400 to-blue-800">
      <MainNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Website;
