import React from "react";
import { DashNavbar, Footer, PageAnimationWrapper } from "components";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <PageAnimationWrapper>
      <DashNavbar />
      <Outlet />
      <Footer />
    </PageAnimationWrapper>
  );
};

export default DashboardLayout;
