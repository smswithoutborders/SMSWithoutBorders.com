import React from "react";
import { motion } from "framer-motion";

export const PageAnimationWrapper = ({ children }) => {
  const x = { target: "0%", initial: "-150%" };
  return (
    <motion.div
      className="min-h-screen font-display"
      initial={{ x: x.initial }}
      animate={{
        x: x.target,
        transitionEnd: {
          x: 0,
        },
      }}
      transition={{ type: "spring", damping: 19 }}
    >
      {children}
    </motion.div>
  );
};
