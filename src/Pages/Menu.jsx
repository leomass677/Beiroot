import React from "react";
import { menuItems } from "../data/menuItems";
import MenuGrid from "../component/MenuGrid";
import MenuBanner from "../component/MenuBanner";

const Menu = () => {
  return (
    <div className="w-full max-w-[1440px] flex flex-col justify-centers">
      <MenuBanner />
      <MenuGrid />
      <section className="mt-299 w-full h-screen bg-amber-300" id="order-now">
        {" "}
      </section>
    </div>
  );
};

export default Menu;
