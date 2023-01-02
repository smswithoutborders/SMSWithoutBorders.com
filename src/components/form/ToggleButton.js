import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const ToggleButton = ({ toggle, onToggle, className }) => {
  return (
    <button
      type="button"
      aria-label={toggle}
      className={clsx("cursor-pointer text-gray-500", className)}
      onClick={() => onToggle(!toggle)}
    >
      {toggle ? <FiEyeOff title="hide" size={18} /> : <FiEye title="show" size={18} />}
    </button>
  );
};

ToggleButton.propTypes = {
  toggle: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
};
