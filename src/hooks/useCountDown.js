/*
Countdown hook
https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
*/

import { useEffect, useState } from "react";
import { useTriggerOTPQuery } from "services";
import toast from "react-hot-toast";

//expects a single object as input
export const useCountDown = ({ uid, phone_number, country_code }) => {
  // build request body
  const request = {
    uid,
    phone_number,
    country_code,
  };
  const {
    data = {},
    error,
    isSuccess,
    refetch: resendOTPCode,
    isFetching: isRequesting,
    isError: OTPRequestError,
  } = useTriggerOTPQuery(request);

  // calculate amount of time left after receiving response
  const [countDown, setCountDown] = useState(0);
  // check and handle errors
  useEffect(() => {
    const deadline = data.expires - Date.now();
    setCountDown(deadline);
    if (OTPRequestError) {
      switch (error.originalStatus) {
        case 400:
          toast.error(
            "Something went wrong \n We are working to resolve this. Please try again"
          );
          break;
        case 401:
          toast.error(
            "Forbidden, Account is unauthorized. \n check your phonenumber and password"
          );
          break;
        case 429:
          toast.error(
            "too many codes requested. please wait a while and try again"
          );
          break;
        case 500:
          toast.error("A critical error occured. Please contact support");
          break;
        default:
          toast.error("An error occured, please check your network try again");
      }
    }
  }, [data, error, isSuccess, country_code, phone_number, OTPRequestError]);

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
