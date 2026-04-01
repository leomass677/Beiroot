import React from "react";
import { svgImg } from "../assets/svgImg";

const MenuBanner = () => {
  return (
    <div className="w-full flex max-w-[1200px] overflow-hidden px-4 border border-gray-50 mx-auto mt-4 py-10">
      {/* <img
        src={svgImg.largeBanner}
        alt=""
        className="border-2  flex-1 border-gray-100 shadow-md rounded-2xl"
      /> */}
      <img
        src={svgImg.smallBanner}
        alt=""
        className="border-2 flex-1 border-primary-50/20 shadow-2xs rounded-xl "
      />
    </div>
  );
};

export default MenuBanner;
