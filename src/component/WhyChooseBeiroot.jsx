import React from "react";
import { svgImg } from "../assets/svgImg";
import { WhyChooseBeirootArray } from "../data/exploreData";

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
      <div className="flex flex-col lg:items-center justify-between lg:flex-row gap-8">
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

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            <hr className=" hidden lg:block w-[3px] h-full bg-gray-50 absolute left-1/2 top-0 rounded-2xl" />
            <span className="hidden lg:block bg-gray-50 w-5 h-5 rounded-2xl absolute left-1/2 bottom-13 -translate-x-[10px] -translate-y-[100px]"></span>
            <span className="hidden lg:block bg-gray-50 w-5 h-5 rounded-2xl absolute left-1/2 bottom-1/2 -translate-x-[10px] -translate-y-[95px]"></span>
            <div className="hidden lg:block"></div>
            {WhyChooseBeirootArray.map((item) => (
              <div
                key={item.id}
                className="flex gap-2 flex-1 lg:border-b-2 lg:pb-6 border-gray-50"
              >
                <div className="min-w-[44px] w-[44px] h-[44px] min-h-[44px] ">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-[43px] h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h6 className="text-base font-medium">{item?.name}</h6>
                  <p className="text-sm leading-snug">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseBeiroot;
