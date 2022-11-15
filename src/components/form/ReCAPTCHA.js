import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Alert } from "../Alert";
import { Button } from "../Buttons";
import { InlineLoader } from "../Loader";
import { useTranslation } from "react-i18next";
import { useController } from "react-hook-form";

/*
 * Implementing reCAPTCHA v2
 * docs: https://developers.google.com/recaptcha/docs/display
 * This component is to be used with a form built with
 * react-hook-form which will provide the setValue function
 */

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const RECAPTCHA_API_URL = process.env.REACT_APP_RECAPTCHA_API_URL;
const RECAPTCHA_ENABLE =
  process.env.REACT_APP_RECAPTCHA_ENABLE === "true" ? true : false;

export const ReCAPTCHA = ({ name, control, helperText, ...rest }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  // status: pending, loaded, failed
  const [status, setStatus] = useState("pending");

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });


  // make callbacks global
  // only display captcha if load is successful
  window.handleLoad = () => {
    try {
      setStatus("loaded");
      window.grecaptcha.render(containerRef.current, {
        "sitekey": SITE_KEY,
      });
    } catch {
      /* library throws an error if the captcha has already been rendered*/
    }
  };
  // save returned token under fieldName on success
  window.handleResponse = (response) => field.onChange(response);
  // handle expiry by invalidating fieldName data
  window.handleExpired = () => field.onChange("");
  // notify user if error occurs
  window.handleError = () => {
    toast.error(t("alert-messages.recaptcha.connect-error"));
  };

  // load recaptcha scripts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = RECAPTCHA_API_URL + "?onload=handleLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    // load captcha timer
    const loadTimer = setTimeout(() => {
      if (status !== "loaded") {
        setStatus("failed");
      }
    }, 60 * 1000);
    return () => {
      document.head.removeChild(script);
      clearTimeout(loadTimer);
    };
  }, [status]);

  // if reCAPTCHA is disabled return alert
  if (!RECAPTCHA_ENABLE) {
    return (
      <Alert
        kind="primary"
        message={t("alert-messages.recaptcha.disabled")}
        hideCloseButton
      />
    );
  }

  // if loaded send captcha
  if (status === "loaded") {
    return (
      <div className="grid place-items-center">
        <div
          ref={containerRef}
          data-sitekey={SITE_KEY}
          data-callback="handleResponse"
          data-expired-callback="handleExpired"
          data-error-callback="handleError"
          {...rest}
        ></div>
        <div className="flex flex-col mt-2">
          <small className="text-red-600">{error?.message}</small>
          <small className="text-gray-500">{helperText}</small>
        </div>
      </div>
    );
  }

  // if failed
  if (status === "failed") {
    return (
      <Alert
        kind="negative"
        message={t("alert-messages.recaptcha.load-error")}
        hideCloseButton
        actions={
          <Button type="button" onClick={() => window.location.reload()}>
            reload
          </Button>
        }
      />
    );
  }

  //default, it is loading
  return (
    <InlineLoader
      className="my-8"
      message={t("alert-messages.recaptcha.loading")}
    />
  );
};

ReCAPTCHA.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  helperText: PropTypes.string,
};
