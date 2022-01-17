import React from "react";
import { Navbar, Footer, PageAnimationWrapper } from "components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <PageAnimationWrapper>
      <Navbar />
      <Outlet />
      <Footer />
    </PageAnimationWrapper>
  );
};

export default Dashboard;
