import React from "react";
import { motion } from "framer-motion";
import { svgImg } from "../assets/svgImg";
import { WhyChooseBeirootArray } from "../data/exploreData";

const WhyChooseBeiroot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20 gap-6 md:gap-7 lg:gap-8 bg-gradient-to-b from-shade to-surface"
    >
      <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center mt-12 md:mt-16 lg:mt-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-dark font-semibold text-lg md:text-xl lg:text-2xl"
        >
          Why Choose Beiroot
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-sm md:text-base max-w-[550px] mx-auto px-4"
        >
          Enjoy freshly prepared meals, quick service, and affordable prices at
          Beiroot making it easy to satisfy your cravings anytime.
        </motion.p>
      </div>

      <div className="flex flex-col lg:items-center justify-between lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: -30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full hidden lg:block max-w-[458px] overflow-hidden justify-center"
        >
          <motion.img
            src={svgImg.shop}
            alt="gallary"
            className="w-full lg:max-w-[485px] mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-4 relative">
            <motion.hr
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block w-[3px] h-full bg-gray-50 absolute left-1/2 top-0 rounded-2xl"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="hidden lg:block bg-gray-50 w-5 h-5 rounded-2xl absolute left-1/2 bottom-13 -translate-x-[10px] -translate-y-[100px]"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="hidden lg:block bg-gray-50 w-5 h-5 rounded-2xl absolute left-1/2 bottom-1/2 -translate-x-[10px] -translate-y-[95px]"
            />
            <div className="hidden lg:block"></div>
            {WhyChooseBeirootArray.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col py-8 lg:py-3 lg:flex-row justify-center items-center gap-2 flex-1 border-gray-50 group bg-gradient-to-br from-surface/60 from-20% via-gray-50/40 to-shade/75 to-78% rounded-md border-gray-50 shadow-2xs lg:shadow-none p-6 lg:rounded-lg backdrop-blur-sm transition-all duration-300"
              >
                <motion.div
                  className="min-w-[44px] w-[44px] h-[44px] min-h-[44px]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-[43px] h-auto object-cover"
                  />
                </motion.div>
                <div className="flex flex-col text-center lg:text-start gap-1">
                  <motion.h6
                    className="text-base font-medium"
                    whileHover={{ color: "#f59e0b" }}
                  >
                    {item?.name}
                  </motion.h6>
                  <p className="text-sm leading-snug">{item?.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseBeiroot;
