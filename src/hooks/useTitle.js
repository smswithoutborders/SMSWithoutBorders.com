import { useEffect } from "react";
import PropTypes from "prop-types";

export const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

useTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
