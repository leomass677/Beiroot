import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { svgImg } from "../assets/svgImg";

const HeroCard = ({ header, subHeader }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const subHeaderVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full h-[200px] md:h-[240px] lg:h-[300px] relative overflow-hidden"
    >
      <motion.img
        variants={imageVariants}
        src={svgImg.bigBeiroot}
        alt="about"
        className="absolute w-full h-full object-top-right object-cover top-0 lg:top-0 right-0"
      />

      {/* overlay */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-black/15 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center justify-center mt-6 h-full text-white text-center px-4">
          <motion.h1
            variants={headerVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-50 to-secondary-50 bg-clip-text text-transparent text-shadow-2xs"
          >
            {header}
          </motion.h1>
          <motion.p
            variants={subHeaderVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {subHeader}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroCard;
