import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

export const FormGroup = ({ className, children, ...rest }) => {
  return (
    <div {...rest} className={clsx("relative mb-4", className)}>
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
