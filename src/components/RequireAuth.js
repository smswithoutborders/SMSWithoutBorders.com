import React from "react";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

// HOC to check user authorization status
export const RequireAuth = ({ children }) => {
  const auth = useSelector(authSelector);
  const location = useLocation();

  return auth.auth_key ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
