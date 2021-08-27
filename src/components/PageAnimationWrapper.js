import React from "react";
import tw from "twin.macro";
import { motion } from "framer-motion";

const Container = tw.div`font-display min-h-screen text-gray-500 overflow-hidden`;

export const PageAnimationWrapper = ({ children }) => {

  const x = { target: "0%", initial: "-150%" };

  return (
    <Container>
      <motion.section
        initial={{ x: x.initial }}
        animate={{
          x: x.target,
          transitionEnd: {
            x: 0
          }
        }}
        transition={{ type: "spring", damping: 19 }}
      >
        {children}
      </motion.section>
    </Container>
  );
}
