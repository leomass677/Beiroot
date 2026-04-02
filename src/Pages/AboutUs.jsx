import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroCard from "../component/HeroCard";
import { AboutUsData } from "../data/exploreData";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  const valueCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    }),
  };

  const teamCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const statNumberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
        duration: 0.6,
      },
    },
  };

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
          <motion.div
            ref={storyRef}
            variants={containerVariants}
            initial="hidden"
            animate={isStoryInView ? "visible" : "hidden"}
            className="mb-16 md:mb-20 lg:mb-24 scroll-mt-20"
            id="story"
          >
            <div className="relative">
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={isStoryInView ? { width: "4rem" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-0 top-0 h-0.5 bg-primary-500 rounded-full"
              ></motion.div>

              <motion.h2
                variants={headingVariants}
                className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-primary-500 mb-4 md:mb-10 pt-4"
              >
                {AboutUsData.story.title}
              </motion.h2>
            </div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6 lg:items-start lg:gap-x-12"
            >
              {AboutUsData.story.content.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  className={`group relative flex flex-col gap-1.5 lg:gap-3 overflow-hidden bg-transparent py-1 ${
                    index === AboutUsData.story.content.length - 1 &&
                    AboutUsData.story.content.length % 2 !== 0 &&
                    "lg:col-span-2"
                  }`}
                >
                  <motion.h3
                    whileHover={{ x: 10, color: "#f59e0b" }}
                    className="text-base md:text-[18px] lg:text-[20px] font-semibold text-gray-800 group-hover:text-primary-500 group-hover:translate-x-4 duration-150 ease-in-out transition-all"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-base text-justify break-word lg:wrap-break-word text-gray-600 leading-relaxed"
                  >
                    {item.text}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            variants={statsVariants}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            className="relative mb-16 md:mb-20 lg:mb-24"
          >
            <div className="bg-gray-50/35 backdrop-blur-sm rounded-lg shadow-2xs border border-gray-100 overflow-hidden relative">
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex -space-x-2 md:-space-x-3 lg:-space-x-4 absolute right-8 top-11 translate-y-1 lg:-translate-4 lg:left-14 "
              >
                {[
                  "bg-primary-500",
                  "bg-primary-400",
                  "bg-secondary-500, bg-secondary-400",
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 lg:scale-80 h-8 lg:w-10 lg:h-10 rounded-full ${color}`}
                  />
                ))}
              </motion.span>
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 p-8 py-16 md:p-10 lg:p-12">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isStatsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 space-y-2 md:space-y-4"
                >
                  <div className="inline-block">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isStatsInView ? { width: "100%" } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="h-0.5 bg-primary-500 rounded-full mb-4"
                    ></motion.div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={isStatsInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-lg md:text-lg pt-6 lg:text-xl font-bold text-gray-900 leading-tight"
                    >
                      A Snapshot of Beiroot's
                      <span className="text-primary-500">
                        {" "}
                        Growth and Impact
                      </span>
                    </motion.h3>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isStatsInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-600 text-justify lg:text-start break-words text-sm md:text-base leading-relaxed pr-1 md:pr-0"
                  >
                    From humble beginnings to a thriving community of food
                    lovers, our journey is marked by milestones that reflect our
                    commitment to quality and customer satisfaction.
                  </motion.p>
                </motion.div>

                {/* Stats Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 text-start justify-items-start gap-6 md:gap-8">
                    {AboutUsData.stats.map((stat, index) => (
                      <motion.div
                        key={stat.id || index}
                        variants={statNumberVariants}
                        custom={index}
                        initial="hidden"
                        animate={isStatsInView ? "visible" : "hidden"}
                        className="text-start md:text-left group"
                      >
                        <div className="relative inline-block">
                          <motion.h4
                            whileHover={{ scale: 1.05 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-300 bg-clip-text text-transparent mb-2 transition-transform duration-300"
                          >
                            {stat.number}
                          </motion.h4>
                          <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute -bottom-1 left-0 h-0.5 bg-primary-400 transition-all duration-300"
                          ></motion.div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide mt-2">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section - Enhanced */}
          <motion.div
            ref={valuesRef}
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            className="mb-16 flex gap-4 bg-primary-100/15 rounded-xs py-16 px-4 md:px-6 lg:px-8 flex-col scroll-mt-20"
            id="values"
          >
            <motion.div
              variants={headingVariants}
              className="text-center md:mb-12 flex flex-col gap-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900"
              >
                {AboutUsData.values?.title || "Our Core Values"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isValuesInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-500 text-sm md:text-base mx-auto"
              >
                {AboutUsData.values?.s ||
                  "The principles that make Beiroot special."}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {AboutUsData.values?.items.map((value, index) => (
                <motion.div
                  key={value.id || index}
                  custom={index}
                  variants={valueCardVariants}
                  initial="hidden"
                  animate={isValuesInView ? "visible" : "hidden"}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="text-center group bg-gradient-to-br from-surface/60 from-20% via-gray-50/40 to-shade/75 to-78% rounded-md border-gray-50 shadow-2xs p-6 lg:rounded-lg backdrop-blur-sm transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="rounded-full flex items-center justify-center mx-auto mb-2"
                  >
                    <div className="p-1 bg-primary-50 rounded-full flex items-center justify-center">
                      <img
                        src={value.img}
                        alt="value image"
                        className="object-cover w-16 h-auto"
                      />
                    </div>
                  </motion.div>
                  <motion.h3
                    whileHover={{ color: "#f59e0b" }}
                    className="text-base md:text-lg font-semibold text-gray-800 mb-2 transition-colors"
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section - Optional Enhancement */}
          {AboutUsData.team && (
            <motion.div
              ref={teamRef}
              variants={containerVariants}
              initial="hidden"
              animate={isTeamInView ? "visible" : "hidden"}
              className="scroll-mt-20"
              id="team"
            >
              <motion.div
                variants={headingVariants}
                className="text-center mb-10 md:mb-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
                >
                  {AboutUsData.team.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isTeamInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-500 text-sm md:text-base"
                >
                  {AboutUsData.team.subtitle}
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {AboutUsData.team.members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    custom={index}
                    variants={teamCardVariants}
                    initial="hidden"
                    animate={isTeamInView ? "visible" : "hidden"}
                    whileHover={{ y: -5 }}
                    className="text-center group bg-gradient-to-br from-gray-50/20 from-20% via-primary-50/10 to-gray-50/5 to-78% p-6 lg:rounded-lg transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative mb-4 overflow-hidden rounded-full w-24 h-24 mx-auto shadow-sm"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    </motion.div>
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <motion.h3
                        whileHover={{ color: "#f59e0b" }}
                        className="text-base md:text-lg font-semibold text-gray-800"
                      >
                        {member.name}
                      </motion.h3>
                      <p className="text-primary-500 text-sm font-medium mb-2">
                        {member.role}
                      </p>
                      <hr className="self-center w-full border-2 text-secondary-500/50 max-w-3 border-dashed rounded-2xl" />
                      <p className="text-sm text-center max-w-[80vw] md:max-w-full text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
