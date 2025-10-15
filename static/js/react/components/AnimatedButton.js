// Example: Let's say you copied this from React Bits
import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ children, onClick, variant = "primary" }) => {
  return (
    <motion.button
      className={`btn btn-${variant} animated-btn`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
