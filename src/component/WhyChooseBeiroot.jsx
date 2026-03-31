import React from "react";
import { svgImg } from "../assets/svgImg";

const WhyChooseBeiroot = () => {
  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20 gap-6 md:gap-7 lg:gap-8 bg-gradient-to-b from-shade to-surface">
      <div className="flex flex-col gap-3  md:gap-4 lg:gap-5 text-center mt-12 md:mt-16 lg:mt-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
          Why Choose Beiroot
        </h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg mx-auto px-4 ">
          Enjoy freshly prepared meals, quick service, and affordable prices at
          Beiroot making it easy to satisfy your cravings anytime.
        </p>
      </div>
      <div className="flex lg:flex-col">
        <div
          className="w-full max-w-[458px] overflow-hidden   justify-center
        "
        >
          <img
            src={svgImg.shop}
            alt="gallary"
            className="w-full lg:max-w-[485px] mx-auto"
          />
        </div>
        {/*  */}
        <div></div>
      </div>
    </div>
  );
};

export default WhyChooseBeiroot;
