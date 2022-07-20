/*
Countdown hook
https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
*/

import { useEffect, useState } from "react";
import { useTriggerOTPQuery } from "services";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

//expects a single object as input
export const useCountDown = (props) => {
  const { t } = useTranslation();
  // build request body
  const request = {
    uid: props?.uid,
    phone_number: props?.phone_number,
    country_code: props?.country_code,
  };

  const {
    data = {},
    error,
    isSuccess,
    refetch: resendOTPCode,
    isFetching: isRequesting,
    isError: OTPRequestError,
  } = useTriggerOTPQuery(request, {
    skip: props?.phone_number ? false : true,
  });

  // calculate amount of time left after receiving response
  const [countDown, setCountDown] = useState(0);
  // check and handle errors
  useEffect(() => {
    const deadline = data ? data.expires - Date.now() : 0;
    setCountDown(deadline);
    if (OTPRequestError) {
      switch (error.originalStatus) {
        case 400:
          toast.error(t("error-messages.400"));
          break;
        case 401:
          toast.error(t("error-messages.401"));
          break;
        case 403:
          toast.error(t("error-messages.403"));
          break;
        case 409:
          toast.error(t("error-messages.409"));
          break;
        case 429:
          toast.error(t("error-messages.429"));
          break;
        case 500:
          toast.error(t("error-messages.500"));
          break;
        default:
          toast.error(t("error-messages.general-error-message"));
      }
    }
  }, [data, error, isSuccess, OTPRequestError, t]);

  useEffect(() => {
    // only run when theres time left
    if (countDown > 0) {
      const interval = setTimeout(() => {
        // subtract 1 second every second
        setCountDown((current) => current - 1000);
      }, 1000);
      return () => clearTimeout(interval);
    }
  }, [countDown]);
  const returnValues = getReturnValues(countDown, data.expires);
  return { ...returnValues, isRequesting, OTPRequestError, resendOTPCode };
};

// process time left in chunks
function getReturnValues(countDown, time) {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // formatting
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  hours = hours >= 10 ? hours : "0" + hours;

  const timer = hours + ":" + minutes + ":" + seconds;
  const expired = countDown <= 0 ? true : false;
  const isInitialized = time >= 0 ? true : false;
  return { timer, expired, isInitialized };
}
