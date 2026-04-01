import React from "react";
import HeroCard from "../component/HeroCard";
import { AboutUsData } from "../data/exploreData";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Hero Section */}
        <HeroCard
          header={AboutUsData.hero.heading}
          subHeader={AboutUsData.hero.subheading}
        />

        {/* Main Content */}
        <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Our Story Section */}
          <div className="mb-16 md:mb-20 lg:mb-24 scroll-mt-20" id="story">
            <div className="relative">
              {/* Decorative line */}
              <div className="absolute left-0 top-0 w-16 h-0.5 bg-primary-500 rounded-full"></div>

              <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-primary-500 mb-4 md:mb-10 pt-4">
                {AboutUsData.story.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AboutUsData.story.content.map((item, index) => (
                <div
                  key={item.id || index}
                  className="group relative flex flex-col gap-2 lg:gap-3 overflow-hidden bg-transparent py-1 "
                >
                  {/* Icon/Number */}

                  <h3 className="text-base md:text-[18px] lg:text-[20px] font-semibold text-gray-800  group-hover:text-primary-500 group-hover:translate-x-4 duration-150 ease-in-out transition-all">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative mb-16 md:mb-20 lg:mb-24">
            <div className="bg-gray-50/35 backdrop-blur-sm rounded-lg shadow-2xs border border-gray-100 overflow-hidden relative">
              <span className="flex -space-x-3 absolute right-8 top-8 lg:-translate-0.5 lg:left-8 ">
                {[
                  "bg-primary-500",
                  "bg-primary-400",
                  "bg-secondary-500, bg-secondary-400",
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`w-10 lg:scale-80 h-10 rounded-full ${color}`}
                  />
                ))}
              </span>
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 p-8 py-16 md:p-10 lg:p-12">
                {/* Left Content */}
                <div className="flex-1 space-y-2  md:space-y-4">
                  <div className="inline-block">
                    <div className=" h-0.5 bg-primary-500 rounded-full mb-4"></div>
                    <h3 className="text-lg md:text-lg pt-2 lg:pt-4  lg:text-xl font-bold text-gray-900 leading-tight">
                      A Snapshot of Beiroot's
                      <span className="text-primary-500">
                        {" "}
                        Growth and Impact
                      </span>
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-1 md:pr-0">
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
                        className="text-start md:text-left group"
                      >
                        <div className="relative inline-block">
                          <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-300 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                            {stat.number}
                          </h4>
                          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></div>
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

          {/* Values Section - Enhanced */}
          <div className="mb-16 md:mb-20 lg:mb-24 scroll-mt-20" id="values">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                {AboutUsData.values?.title || "Our Core Values"}
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-[200px] mx-auto">
                {AboutUsData.values?.subtitle || "What makes us different"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {AboutUsData.values?.items.map((value, index) => (
                <div
                  key={value.id || index}
                  className="text-center group bg-gradient-to-br from-surface/10 sh adow-2xs from-20% via-gray-50/40 to-shade/25 to-78%  p-6 lg:rounded-md transition-all duration-300"
                >
                  <div className="  rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="p-1 bg-primary- 50 rounded-full flex items-center justify-center">
                      <img
                        src={value.img}
                        alt="value image"
                        className="object-cover w-16 h-auto"
                      />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div></div>

          {/* Team Section - Optional Enhancement */}
          {AboutUsData.team && (
            <div className="scroll-mt-20" id="team">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {AboutUsData.team.title}
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  {AboutUsData.team.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {AboutUsData.team.members.map((member) => (
                  <div key={member.id} className="group text-center">
                    <div className="relative mb-4 overflow-hidden rounded-full w-28 h-28 mx-auto shadow-sm">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-500 text-sm font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
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
