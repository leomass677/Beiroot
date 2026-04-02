import React, { useEffect, useRef, useState } from "react";
import HeroCard from "../component/HeroCard";
import { AboutUsData } from "../data/exploreData";

// Custom hook for intersection observer
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated, options]);

  return [ref, isInView];
};

const AboutUs = () => {
  // Intersection observer refs and states
  const [storyRef, storyInView] = useInView({ threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ threshold: 0.2 });

  // Safely check if data exists
  if (!AboutUsData || !AboutUsData.hero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          About page content is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Hero Section */}
        <HeroCard
          header={AboutUsData.hero.heading}
          subHeader={AboutUsData.hero.subheading}
        />

        {/* Main Content */}
        <section
          id="aboutUs"
          style={{ scrollMarginTop: "80px" }}
          className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
        >
          {/* Our Story Section */}
          <div
            ref={storyRef}
            className={`mb-16 md:mb-20 lg:mb-24 scroll-mt-20 transition-all duration-700 ${
              storyInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            id="story"
          >
            <div className="relative">
              {/* Decorative line */}
              <div
                className={`absolute left-0 top-0 h-0.5 bg-primary-500 rounded-full transition-all duration-1000 delay-300 ${
                  storyInView ? "w-16" : "w-0"
                }`}
              ></div>

              <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-primary-500 mb-4 md:mb-10 pt-4">
                {AboutUsData.story.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6 lg:items-start lg:gap-x-12">
              {AboutUsData.story.content.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`group relative flex flex-col gap-1.5 lg:gap-3 overflow-hidden bg-transparent py-1 transition-all duration-500 ${
                    storyInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: storyInView ? `${index * 100 + 200}ms` : "0ms",
                  }}
                >
                  <h3 className="text-base md:text-[18px] lg:text-[20px] font-semibold text-gray-800 group-hover:text-primary-500 group-hover:translate-x-4 duration-150 ease-in-out transition-all">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-justify break-word lg:wrap-break-word text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className={`relative mb-16 md:mb-20 lg:mb-24 transition-all duration-700 ${
              statsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gray-50/35 backdrop-blur-sm rounded-lg shadow-2xs border border-gray-100 overflow-hidden relative">
              <span
                className={`flex -space-x-2 md:-space-x-3 lg:-space-x-4 absolute right-8 top-11 translate-y-1 lg:-translate-4 lg:left-14 transition-all duration-500 delay-300 ${
                  statsInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                {[
                  "bg-primary-500",
                  "bg-primary-400",
                  "bg-secondary-500",
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 lg:w-10 h-8 lg:h-10 rounded-full ${color} transition-transform duration-300`}
                    style={{
                      transitionDelay: statsInView ? `${index * 100 + 400}ms` : "0ms",
                    }}
                  />
                ))}
              </span>
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 p-8 py-16 md:p-10 lg:p-12">
                {/* Left Content */}
                <div className="flex-1 space-y-2 md:space-y-4">
                  <div className="inline-block">
                    <div
                      className={`h-0.5 bg-primary-500 rounded-full mb-4 transition-all duration-600 delay-200 ${
                        statsInView ? "w-full" : "w-0"
                      }`}
                    ></div>
                    <h3 className="text-lg md:text-lg pt-6 lg:text-xl font-bold text-gray-900 leading-tight">
                      A Snapshot of Beiroot's
                      <span className="text-primary-500">
                        {" "}
                        Growth and Impact
                      </span>
                    </h3>
                  </div>
                  <p className="text-gray-600 text-justify lg:text-start break-words text-sm md:text-base leading-relaxed pr-1 md:pr-0">
                    From humble beginnings to a thriving community of food
                    lovers, our journey is marked by milestones that reflect our
                    commitment to quality and customer satisfaction.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 text-start justify-items-start gap-6 md:gap-8">
                    {AboutUsData.stats.map((stat, index) => (
                      <div
                        key={stat.id || index}
                        className={`text-start md:text-left group transition-all duration-500 ${
                          statsInView
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-4 scale-95"
                        }`}
                        style={{
                          transitionDelay: statsInView ? `${index * 150 + 500}ms` : "0ms",
                        }}
                      >
                        <div className="relative inline-block">
                          <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-300 bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover:scale-105">
                            {stat.number}
                          </h4>
                          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide mt-2">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div
            ref={valuesRef}
            className={`mb-16 flex gap-4 bg-primary-100/15 rounded-xs py-16 px-4 md:px-6 lg:px-8 flex-col scroll-mt-20 transition-all duration-700 ${
              valuesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            id="values"
          >
            <div className="text-center md:mb-12 flex flex-col gap-4">
              <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900">
                {AboutUsData.values?.title || "Our Core Values"}
              </h2>
              <p className="text-gray-500 text-sm md:text-base mx-auto">
                {AboutUsData.values?.subtitle ||
                  "The principles that make Beiroot special."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {AboutUsData.values?.items.map((value, index) => (
                <div
                  key={value.id || index}
                  className={`text-center group bg-gradient-to-br from-surface/60 from-20% via-gray-50/40 to-shade/75 to-78% rounded-md border-gray-50 shadow-2xs p-6 lg:rounded-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${
                    valuesInView
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  }`}
                  style={{
                    transitionDelay: valuesInView ? `${index * 100 + 200}ms` : "0ms",
                  }}
                >
                  <div className="rounded-full flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-5">
                    <div className="p-1 bg-primary-50 rounded-full flex items-center justify-center">
                      <img
                        src={value.img}
                        alt="value image"
                        className="object-cover w-16 h-auto"
                      />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 transition-colors group-hover:text-primary-500">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          {AboutUsData.team && (
            <div
              ref={teamRef}
              className={`scroll-mt-20 transition-all duration-700 ${
                teamInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              id="team"
            >
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {AboutUsData.team.title}
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  {AboutUsData.team.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {AboutUsData.team.members.map((member, index) => (
                  <div
                    key={member.id}
                    className={`text-center group bg-gradient-to-br from-gray-50/20 from-20% via-primary-50/10 to-gray-50/5 to-78% p-6 lg:rounded-lg transition-all duration-500 hover:-translate-y-1 ${
                      teamInView
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95"
                    }`}
                    style={{
                      transitionDelay: teamInView ? `${index * 100 + 200}ms` : "0ms",
                    }}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-full w-24 h-24 mx-auto shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 transition-colors group-hover:text-primary-500">
                        {member.name}
                      </h3>
                      <p className="text-primary-500 text-sm font-medium mb-2">
                        {member.role}
                      </p>
                      <hr className="self-center w-full border-2 text-secondary-500/50 max-w-3 border-dashed rounded-2xl" />
                      <p className="text-sm text-center max-w-[80vw] md:max-w-full text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutUs;