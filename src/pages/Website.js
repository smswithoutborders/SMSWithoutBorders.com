import React, { Fragment } from "react";
import { MainNavbar, Footer } from "components";
import { Outlet } from "react-router-dom";

const Website = () => {
  return (
    <Fragment>
      <MainNavbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Website;
