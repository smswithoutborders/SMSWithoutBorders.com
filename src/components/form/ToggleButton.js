import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const ToggleButton = ({ value, onToggle, className }) => {
  return (
    <button
      type="button"
      aria-label={value}
      className={clsx("cursor-pointer text-gray-500", className)}
      onClick={() => onToggle(!value)}
    >
      {value ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  );
};

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};
