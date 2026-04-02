import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { svgImg } from "../assets/svgImg";
import Skeleton from "./Skeleton";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const MenuBanner = ({ isLoading = false }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const bannerItems = [
    {
      id: 1,
      img: svgImg.sliderMobile1,
      imgTablet: svgImg.sliderTablet1,
      alt: "Banner 1",
    },
    {
      id: 2,
      img: svgImg.sliderMobile2,
      imgTablet: svgImg.sliderTablet2,
      alt: "Banner 2",
    },
    {
      id: 3,
      img: svgImg.sliderMobile1,
      imgTablet: svgImg.sliderTablet1,
      alt: "Banner 3",
    },
    {
      id: 4,
      img: svgImg.sliderMobile2,
      imgTablet: svgImg.sliderTablet2,
      alt: "Banner 4",
    },
  ];

  if (isLoading) {
    return (
      <motion.div
        ref={sectionRef}
        className="w-full max-w-[1200px] mx-auto mt-4 py-10 px-4"
      >
        <Skeleton height="h-64" className="rounded-lg" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-[1200px] mx-auto mt-4 py-10 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={500}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
          className="rounded-lg [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:!flex [&_.swiper-pagination]:!justify-center [&_.swiper-pagination]:!items-center [&_.swiper-pagination]:!gap-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!bg-primary-200 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!bg-primary-500 [&_.swiper-pagination-bullet-active]:!rounded-[4px] [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300"
          style={{ paddingBottom: "40px" }}
        >
          {bannerItems.map((item) => (
            <SwiperSlide key={item.id}>
              <picture>
                <source media="(max-width: 639px)" srcSet={item.img} />
                <source media="(min-width: 640px)" srcSet={item.imgTablet} />
                <img
                  src={item.imgTablet}
                  alt={item.alt}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  draggable={false}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex justify-center mt-6 md:hidden"
        >
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h14"
              />
            </svg>
            <span>Swipe to browse</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MenuBanner;
