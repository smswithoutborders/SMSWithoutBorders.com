import React from "react";
import { validationSelector } from "features";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

/*
  HOC to check user authorization status for other tasks
  like password reset requiring a session
*/
export const RequireSession = ({ children }) => {
  const auth = useSelector(validationSelector);
  const location = useLocation();

  return auth.session_id ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
