import React from "react";
import { svgImg } from "../assets/svgImg";

const HeroCard = ({ header, subHeader }) => {
  return (
    <div className="w-full h-[200px] md:h-[240px] lg:h-[300px] relative overflow-hidden">
      <img
        src={svgImg.bigBeiroot}
        alt="about"
        className="absolute w-full h-full  object-top-right object-cover top-0 lg:top-0 right-0"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/15  backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center mt-6 h-full text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-4  bg-gradient-to-r from-primary-50 to-secondary-50 bg-clip-text  text-shadow-2xs">
            {header}
          </h1>
          <p>{subHeader}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
