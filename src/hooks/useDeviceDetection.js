/*
 device detection hook
 credits: https://codezup.com/detect-mobile-device-browser-javascript-react-node/
*/

import { useEffect, useState } from "react";

export const useDeviceDetection = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return width <= 768;
};
