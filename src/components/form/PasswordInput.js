import React, { useState, forwardRef, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { ToggleButton } from "./ToggleButton";
import { Input } from "./Input";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks";

// Password Input Component
export const PasswordInput = forwardRef(
  ({ onChange, showStrength, ...rest }, ref) => {
    const { t } = useTranslation();
    const [toggle, setToggle] = useState(false);
    const [strength, setStrength] = useState(null);
    const { language } = useLanguage();

    function calculateStrength(password) {
      if (password.length > 0) {
        /*
        Dynamic import - rename default import to lib name for clarity
        https://www.smashingmagazine.com/2022/02/javascript-bundle-performance-code-splitting/
         */
        import("zxcvbn").then(({ default: zxcvbn }) => {
          const result = zxcvbn(password);
          setStrength(result.score);
        });
      } else {
        setStrength(null);
      }
    }

    return (
      <Fragment>
        <div className="relative rounded-md">
          <Input
            ref={ref}
            type={toggle ? "text" : "password"}
            onChange={(evt) => {
              if (showStrength) {
                calculateStrength(evt.target.value);
                onChange(evt);
              } else {
                onChange(evt);
              }
            }}
            {...rest}
          />
          <ToggleButton
            className={clsx(
              "absolute top-4",
              language?.dir === "ltr" ? "right-3" : "left-4"
            )}
            onToggle={setToggle}
            toggle={toggle}
          />
        </div>

        {showStrength && strength !== null && (
          <div className="w-full mt-2 mb-2">
            <div className="grid w-full h-1 grid-cols-4 bg-gray-200 rounded-full">
              <div
                aria-label="password strength"
                className={clsx(
                  strength === 4
                    ? "bg-lime-500 col-span-full"
                    : strength === 3
                      ? "bg-indigo-500 col-span-3"
                      : strength === 2
                        ? "bg-yellow-500 col-span-2"
                        : strength === 1
                          ? "bg-fuchsia-500 col-span-1"
                          : "bg-red-500"
                )}
              ></div>
            </div>
            <div className="my-1 text-xs text-right text-gray-500">
              <span>
                {strength === 4
                  ? t("labels.strong")
                  : strength === 3
                    ? t("labels.good")
                    : strength === 2
                      ? t("labels.average")
                      : strength === 1
                        ? t("labels.weak")
                        : t("labels.very-weak")}
              </span>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

PasswordInput.defaultProps = {
  showStrength: true,
};

PasswordInput.propTypes = {
  onChange: PropTypes.func,
  showStrength: PropTypes.bool,
};
