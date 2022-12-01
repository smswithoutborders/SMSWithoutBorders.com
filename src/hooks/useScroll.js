import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const { hash } = useLocation();

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);


  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    } else if (window.scrollY > 400) {
      window.scrollTo(0, 0);
    }
  }, [hash]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);




  return scrolled;
};
