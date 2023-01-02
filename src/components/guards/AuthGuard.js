import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { authSelector, saveAuth } from "features";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

// HOC to check user authorization status
export const AuthGuard = ({ children }) => {
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

AuthGuard.propTypes = {
  children: PropTypes.node,
};
