import React from "react";
import Hero from "../component/Hero";
import ExploreOurMenu from "../component/ExploreOurMenu";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-full scroll-0">
      <Hero />
      <ExploreOurMenu />
    </div>
  );
};

export default Home;
