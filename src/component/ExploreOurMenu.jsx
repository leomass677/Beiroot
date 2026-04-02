import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Skeleton from "./Skeleton";
import { exploreData } from "../data/exploreData";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ExploreOurMenu = React.memo(({ isLoading = false }) => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Optimized resize handler with debounce
  useEffect(() => {
    const getItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 4;
      if (width >= 768) return 3;
      return 2;
    };

    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    handleResize();

    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const totalItems = exploreData.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 200);
  };

  // Memoize visible items to prevent unnecessary recalculations
  const visibleItems = useMemo(() => {
    return exploreData.slice(currentIndex, currentIndex + itemsPerView);
  }, [currentIndex, itemsPerView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  // Button animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
  };

  // Swipe indicator animation
  const swipeIndicatorVariants = {
    animate: {
      x: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  // Pagination dot animation
  const dotVariants = {
    inactive: { width: "0.5rem", backgroundColor: "#d1d5db" },
    active: { width: "1.5rem", backgroundColor: "#f59e0b" },
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20 gap-6 md:gap-7 lg:gap-8 bg-gradient-to-b from-shade to-surface"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center mt-12 md:mt-16 lg:mt-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl lg:text-2xl font-semibold text-dark"
        >
          Explore Our Menu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-sm md:text-base lg:text-lg mx-auto px-4 "
        >
          Discover a variety of delicious meals, snacks, and extras carefully
          prepared to satisfy every craving.
        </motion.p>
      </motion.div>

      {/* Cards Container with Buttons */}
      <div className="relative max-w-[1200px] md:px-4 lg:px-6 mx-auto w-full">
        {/* Desktop Navigation Buttons - Only visible on desktop */}
        {maxIndex > 0 && (
          <>
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0 || isAnimating}
              variants={buttonVariants}
              initial="initial"
              whileHover={currentIndex !== 0 && !isAnimating ? "hover" : ""}
              whileTap={currentIndex !== 0 && !isAnimating ? "tap" : ""}
              animate={
                currentIndex === 0 || isAnimating ? "disabled" : "initial"
              }
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-full transition-all duration-200 ${
                currentIndex === 0 || isAnimating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:scale-105 cursor-pointer hover:text-white"
              }`}
              aria-label="Previous"
            >
              <IoIosArrowBack
                className={`text-lg md:text-xl ${currentIndex === 0 ? "text-gray-400" : "text-dark"}`}
              />
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex || isAnimating}
              variants={buttonVariants}
              initial="initial"
              whileHover={
                currentIndex < maxIndex && !isAnimating ? "hover" : ""
              }
              whileTap={currentIndex < maxIndex && !isAnimating ? "tap" : ""}
              animate={
                currentIndex >= maxIndex || isAnimating ? "disabled" : "initial"
              }
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-full transition-all duration-200 ${
                currentIndex >= maxIndex || isAnimating
                  ? "opacity-50  cursor-not-allowed"
                  : "hover:bg-gray-100 hover:scale-105 cursor-pointer hover:text-white"
              }`}
              aria-label="Next"
            >
              <IoIosArrowForward
                className={`text-lg md:text-xl ${currentIndex >= maxIndex ? "text-gray-400" : "text-dark"}`}
              />
            </motion.button>
          </>
        )}

        {/* Swipe Indicator - Mobile & Tablet */}
        {maxIndex > 0 && (
          <motion.div
            variants={swipeIndicatorVariants}
            animate="animate"
            className="flex justify-center mb-3 lg:hidden"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h14m-6 4l4-4m0 0l-4-4m4 4H3"
                />
              </svg>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Swipe to explore more
              </motion.span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </motion.div>
        )}

        {/* Cards Grid - With Swipe Support on Mobile/Tablet */}
        <div
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="px-2 md:px-8"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              >
                {Array.from({ length: itemsPerView }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-3"
                  >
                    <Skeleton height="h-20 w-20" circle />
                    <Skeleton height="h-4" width="w-3/4" />
                    <Skeleton height="h-3" width="w-1/2" />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              >
                {visibleItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer"
                  >
                    <motion.div
                      className="flex flex-col items-center justify-center flex-1 h-full w-full bg-transparent shadow-none rounded-xl hover:-translate-y-1 transition-all duration-200 p-3 sm:p-4 md:p-5 border border-surface hover:border-primary-50"
                      whileHover={{
                        borderColor: "#f59e0b",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Image Container */}
                      <motion.div
                        className="relative mb-2 md:mb-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="object-contain w-[60px] sm:w-[70px] md:w-[80px] h-[60px] sm:h-[70px] md:h-[80px] transition-transform duration-200 group-hover:scale-105"
                        />
                      </motion.div>

                      {/* Content */}
                      <div className="flex flex-col gap-1 items-center text-center w-full">
                        <motion.h6
                          className="font-bold text-dark text-xs sm:text-sm md:text-base line-clamp-1"
                          whileHover={{ color: "#f59e0b" }}
                        >
                          {item.title}
                        </motion.h6>
                        <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.span
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 200);
                }
              }}
              variants={dotVariants}
              initial="inactive"
              animate={currentIndex === index ? "active" : "inactive"}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.2 }}
              className="h-1.5 sm:h-2 rounded-full cursor-pointer"
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
});

ExploreOurMenu.displayName = "ExploreOurMenu";

export default ExploreOurMenu;
