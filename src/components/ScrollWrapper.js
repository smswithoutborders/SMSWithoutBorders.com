import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

//ref : https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/
//ref : https://github.com/remix-run/react-router/issues/394
export const ScrollWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return children;
};

ScrollWrapper.propTypes = {
  children: PropTypes.node,
};
