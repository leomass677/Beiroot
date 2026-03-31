import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { heroVidio } from "../assets/video";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleNavigate = (id) => {
    navigate(id);
  };

  const handleScrollToOrder = () => {
    const element = document.getElementById("order-now");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        damping: 10,
        stiffness: 150,
      },
    }),
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative max-w-[100vw] w-full h-[calc(100vh-60px)] lg:h-[calc(100vh-97px)] overflow-hidden"
    >
      {/* Video Background with subtle zoom animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="w-full h-full"
      >
        <video
          autoPlay
          loops
          muted
          playsInline
          className="w-full object-cover h-full"
        >
          <source src={heroVidio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-none"
        >
          {/* Tags row */}
          <motion.div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center">
            {[
              { name: "Fresh", color: "text-primary-500" },
              { name: "•", color: "text-shade" },
              { name: "Delicious", color: "text-shade" },
              { name: "•", color: "text-shade" },
              { name: "Fast", color: "text-secondary-500" },
            ].map((item, index) => (
              <motion.h6
                key={index}
                custom={index}
                variants={tagVariants}
                className={`text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] font-semibold mb-2 sm:mb-3 md:mb-4 ${item.color}`}
              >
                {item.name}
              </motion.h6>
            ))}
          </motion.div>

          {/* Main content */}
          <motion.div className="max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[700px] mt-2 sm:mt-3 md:mt-4 px-2 sm:px-3 md:px-4 text-start lg:text-center flex flex-col gap-[16px] sm:gap-[20px] md:gap-[24px] items-start lg:items-center mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] font-bold text-shade leading-tight"
            >
              Experience the Taste of{" "}
              <span className="text-primary-500 inline-block">Beiroot</span> in{" "}
              <span className="whitespace-nowrap">Ilorin</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-[16px] md:text-[18px]  font-normal text-shade leading-relaxed"
            >
              Enjoy freshly prepared meals, tasty snacks, and refreshing drinks
              made with quality ingredients and bold flavors. Whether you're
              craving a quick bite or a full meal, Beiroot makes ordering easy
              and fast with our simple WhatsApp ordering system.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 sm:gap-4 w-full mt-2 lg:font-semibold justify-between items-center sm:max-w-[340px]  md:max-w-[380px] lg:max-w-[400px]"
            >
              <motion.a
                href="https://wa.me/2348034567890"
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-gradient-primary cursor-pointer text-surface px-[16px] sm:px-[20px] md:px-[24px] h-[50px] sm:h-[55px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] max-h-fit rounded-full flex items-center justify-center flex-1 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={handleScrollToOrder}
                  className="w-full text-sm sm:text-base md:text-base font-medium"
                >
                  Order Now
                </button>
              </motion.a>

              <motion.button
                onClick={() => handleNavigate("menu")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-shade cursor-pointer text-dark px-[16px] sm:px-[20px] md:px-[24px] h-[50px] sm:h-[55px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] max-h-fit flex-1 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-sm sm:text-base md:text-base font-medium">
                  View Menu
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
