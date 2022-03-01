import React, { isValidElement, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  FiX,
  FiXCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export const Alert = ({
  kind,
  role,
  message,
  actions,
  isVisible,
  onClose,
  hideCloseButton,
  ...rest
}) => {
  const [open, setOpen] = useState(isVisible);
  // alert close handler
  function handleClose() {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
    setOpen(false);
  }

  return (
    <div
      className={clsx(
        "flex justify-between px-2 py-4 md:p-4 text-sm md:text-base border-l-4 text-gray-700 rounded",
        kind === "primary" && "bg-blue-100 border-blue-800",
        kind === "affirmative" && "bg-green-100 border-green-500 ",
        kind === "negative" && "bg-red-100 border-red-500 ",
        kind === "warning" && "bg-yellow-100 border-yellow-400 ",
        !open && "hidden"
      )}
      {...rest}
    >
      <div className="col-span-1">
        {kind === "affirmative" ? (
          <FiCheckCircle size={24} className="text-green-500" />
        ) : kind === "warning" ? (
          <FiAlertTriangle size={24} className="text-yellow-500" />
        ) : kind === "negative" ? (
          <FiXCircle size={24} className="text-red-500" />
        ) : (
          <FiAlertCircle size={24} className="text-blue-800" />
        )}
      </div>

      <div className="mx-2 text-left">
        <span className="">{message}</span>
        {actions && isValidElement(actions) && (
          <div className="mt-4">{actions}</div>
        )}
      </div>

      <div className="col-span-1">
        {!hideCloseButton && (
          <FiX
            size={18}
            className="cursor-pointer"
            onClick={() => handleClose()}
            title="close"
          />
        )}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  kind: "primary",
  role: "alert",
  message: "Alert message",
  isVisible: true,
  hideCloseButton: false,
};

Alert.propTypes = {
  kind: PropTypes.oneOf(["primary", "affirmative", "negative", "warning"]),
  role: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  hideCloseButton: PropTypes.bool,
  actions: PropTypes.node,
};
