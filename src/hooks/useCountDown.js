/*
Countdown hook
https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
*/

import { useEffect, useState } from "react";

export const useCountDown = (date) => {
  // calculate amount of time left after receiving response
  const [countDown, setCountDown] = useState(() => {
    return date ? date - Date.now() : null;
  });
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
  return getReturnValues(countDown, date);
};

// process time left in chunks
function getReturnValues(countDown, date) {
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
  const isInitialized = date >= 0 ? true : false;
  return { timer, expired, isInitialized };
}
