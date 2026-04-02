import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Skeleton from "./Skeleton";
import { svgImg } from "../assets/svgImg";
import { AboutUsData } from "../data/exploreData";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const SimpleAboutUs = ({ isLoading = false }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleScroll = () => {
    navigate("/about");

    setTimeout(() => {
      const element = document.getElementById("aboutUs");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      ref={ref}
      className="max-w-[1440px] px-4 md:px-6 lg:px-8 xl:px-12 mx-auto w-full scroll-0"
    >
      <div className="flex mx-auto flex-col gap-8 w-full max-w-[1220px]">
        {isLoading ? (
          <Skeleton height="h-64 lg:h-70" className="rounded-xs" />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="overflow-hidden h-fit rounded-xs lg:h-[280px]"
          >
            <img
              src={svgImg.bigBeiroot}
              alt="img"
              className="w-full object-cover"
            />
          </motion.div>
        )}

        <div className="flex flex-col gap-2 max-w-[1164px]">
          <motion.hr
            initial={{ width: 0 }}
            animate={isInView ? { width: "3.75rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-15 mb-1 rounded-4xl border-[1.5px] border-primary-500"
          />

          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[18px] md:text-[24px] font-bold text-primary-400"
          >
            {AboutUsData.hero.heading}
          </motion.h4>

          <div className="flex flex-col gap-2.5">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm font-medium md:text-base text-gray-700 leading-relaxed border-l-2 border-primary-300 pl-2 rounded-xs"
            >
              {AboutUsData.hero.subheading}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm md:text-base text-wrap text-gray-600 text-justify leading-relaxed"
            >
              {AboutUsData.hero.description.slice(0, 378).concat(". ")}
              <motion.button
                onClick={handleScroll}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="text-base text-primary-500 cursor-pointer items-center md:pl-2"
              >
                <span className="flex items-center gap-0.5 group">
                  Learn more
                  <IoIosArrowForward className="text-base xl:opacity-0 group-hover:opacity-100 xl:scale-0 xl:translate-x-4 xl:group-hover:scale-100 xl:group-hover:translate-x-1 transition-all duration-150 ease-in-out" />
                </span>
              </motion.button>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAboutUs;
