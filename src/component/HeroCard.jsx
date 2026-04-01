import React from "react";
import { svgImg } from "../assets/svgImg";

const HeroCard = ({ header, subHeader }) => {
  return (
    <div className="w-full h-[300px] md:h-[280px] relative overflow-hidden">
      <img
        src={svgImg.shop}
        alt="about"
        className="absolute w-full h-full  object-top-right object-cover top-0 hover:scale-90"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/25  backdrop-blur-xs">
        <div className="flex flex-col items-center justify-center mt-6 h-full text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-4 mt-10 text-primary-50 text-shadow-2xs">
            {header}
          </h1>
          <p>{subHeader}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
