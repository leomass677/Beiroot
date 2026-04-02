import React from "react";
import MenuGrid from "../component/MenuGrid";
import MenuBanner from "../component/MenuBanner";

const Menu = () => {
  return (
    <div className="w-full max-w-[1440px] flex flex-col justify-centers">
      <MenuBanner />
      <MenuGrid id="order-now" />
    </div>
  );
};

export default Menu;
