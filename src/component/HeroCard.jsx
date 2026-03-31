import React from "react";
import { svgImg } from "../assets/svgImg";

const HeroCard = () => {
  return (
    <div className="w-full h-[400px] relative overflow-hidden">
      <img
        src={svgImg.shop}
        alt="about"
        className="absolute w-full h-full left-0 top-0 object-cover"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50">
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-4 mt-10">About Beiroot</h1>
          <p>
            At Beiroot, we are passionate about bringing the vibrant flavors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
