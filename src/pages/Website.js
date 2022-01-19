import React from "react";
import { MainNavbar, Footer, PageAnimationWrapper } from "components";
import { Outlet } from "react-router-dom";

const Website = () => {
  return (
    <PageAnimationWrapper>
      <MainNavbar />
      <Outlet />
      <Footer />
    </PageAnimationWrapper>
  );
};

export default Website;
