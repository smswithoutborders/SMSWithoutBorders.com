import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// HOC to check user authorization status
export const VerificationGuard = ({ children, required = [] }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // check if required variables are present
  useEffect(() => {
    const keys = state ? Object.keys(state) : [];
    if (!required.every((item) => keys.includes(item))) {
      navigate(-1, { replace: true });
    }
  }, [state, navigate, required]);

  return children;
};

VerificationGuard.propTypes = {
  required: PropTypes.array.isRequired,
  children: PropTypes.node,
};
