import React, { forwardRef, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Input = forwardRef(
  (
    { className, invalid, invalidText, labelText, helperText, ...rest },
    ref
  ) => {
    return (
      <Fragment>
        <input
          ref={ref}
          className={clsx(
            "w-full text-sm px-3 py-3 block rounded-md text-gray-600 shadow-sm ring-0 focus:ring-0",
            invalid
              ? "border-2 border-red-600 focus:border-red-600"
              : "border-2 border-gray-300 focus:border-blue-800"
          )}
          {...rest}
        />
        <div className="flex flex-col mt-2">
          <small className="text-red-600">{invalidText}</small>
          <small className="text-gray-500">{helperText}</small>
        </div>
      </Fragment>
    );
  }
);

Input.propTypes = {
  invalidText: PropTypes.string,
};
