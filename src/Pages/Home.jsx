import React from "react";
import Hero from "../component/Hero";
import ExploreOurMenu from "../component/ExploreOurMenu";
import Gallery from "../component/Gallery";
import WhyChooseBeiroot from "../component/WhyChooseBeiroot";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full scroll-0">
      <Hero />
      <ExploreOurMenu />
      <Gallery />
      <WhyChooseBeiroot />
    </div>
  );
};

export default Home;
