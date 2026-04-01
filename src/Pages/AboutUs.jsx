import React from "react";
import HeroCard from "../component/HeroCard";

const AboutUs = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full">
      <HeroCard
        header={"About Beiroot"}
        subHeader={
          " At Beiroot, we are passionate about bringing the vibrant flavors."
        }
      />
    </div>
  );
};

export default AboutUs;
