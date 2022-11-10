import { useEffect, useState, useCallback } from "react";

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

  return scrolled;
};
