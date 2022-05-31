import React, { useEffect } from "react";
import { authSelector, saveAuth } from "features";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

// HOC to check user authorization status
export const RequireAuth = ({ children }) => {
  const auth = useSelector(authSelector);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.uid) {
      saveAuth(location.state);
    }
  }, [location.state]);

  return auth.uid ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
