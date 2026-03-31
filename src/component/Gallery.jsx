import React from "react";
import { svgImg } from "../assets/svgImg";

const Gallery = () => {
  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20 gap-6 md:gap-7 lg:gap-8 bg-gradient-to-b from-shade to-surface">
      <div className="flex flex-col gap-3  md:gap-4 lg:gap-5 text-center mt-12 md:mt-16 lg:mt-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
          Gallery
        </h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg mx-auto px-4 ">
          A glimpse into our delicious offerings
        </p>
      </div>
      <div
        className="w-full  justify-center
      "
      >
        <img
          src={svgImg.gallery}
          alt="gallary"
          className="w-[1000px] mx-auto"
        />
      </div>
    </div>
  );
};

export default Gallery;
