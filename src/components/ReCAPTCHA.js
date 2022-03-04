import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Alert } from "./Alert";

/*
  Implementing reCAPTCHA v2
  docs: https://developers.google.com/recaptcha/docs/display

  This component is to be used with a form built with
  react-hook-form which will provide the setValue function
*/

export const ReCAPTCHA = ({ setValue, fieldName, ...rest }) => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  const RECAPTCHA_API_URL = process.env.REACT_APP_RECAPTCHA_API_URL;

  // only display captcha if load is successful
  function handleLoad() {
    try {
      setLoaded(true);
      window.grecaptcha.render(containerRef.current, {
        "sitekey": SITE_KEY,
      });
    } catch {
      /* library throws an error if the captcha has already been rendered*/
    }
  }

  // save returned token under fieldName on success
  function handleResponse(response) {
    setValue(fieldName, response, {
      shouldValidate: true,
    });
  }

  // handle expiry by invalidating fieldName data
  function handleExpired() {
    setValue(fieldName, "", {
      shouldValidate: true,
    });
  }

  // notify user if error occurs
  function handleError() {
    toast.error(
      "reCAPTCHA failed to connect. Please check your network and reload this page"
    );
  }

  // make callbacks global
  window.handleLoad = handleLoad;
  window.handleResponse = handleResponse;
  window.handleExpired = handleExpired;
  window.handleError = handleError;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = RECAPTCHA_API_URL + "?onload=handleLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [RECAPTCHA_API_URL]);

  if (!loaded) {
    return (
      <Alert
        kind="negative"
        message="reCAPTCHA failed to load. Please make sure you have an active internet connection"
        hideCloseButton
      />
    );
  }
  return (
    <div
      ref={containerRef}
      className="flex items-stretch justify-center w-full"
      data-sitekey={SITE_KEY}
      data-callback="handleResponse"
      data-expired-callback="handleExpired"
      data-error-callback="handleError"
      {...rest}
    ></div>
  );
};

ReCAPTCHA.propTypes = {
  setValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};
