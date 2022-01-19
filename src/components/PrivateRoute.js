import React from "react";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const auth = useSelector(authSelector);
  const location = useLocation();

  return auth.authKey ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
