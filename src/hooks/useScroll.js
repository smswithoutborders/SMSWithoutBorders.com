import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);


  //ref : https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/
  //ref : https://github.com/remix-run/react-router/issues/394


  const ScrollWrapper = ({ children }) => {
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

  return {
    ScrollWrapper,
    scrolled
  };
};
