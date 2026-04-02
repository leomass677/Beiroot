import React, { useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "./Skeleton";
import { svgImg } from "../assets/svgImg";

const Gallery = React.memo(({ isLoading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pb-12 md:pb-16 lg:pb-20 gap-6 md:gap-7 lg:gap-8 bg-gradient-to-b from-shade to-surface"
    >
      <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center mt-12 md:mt-16 lg:mt-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl lg:text-2xl font-semibold text-dark"
        >
          Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-sm md:text-base lg:text-lg mx-auto px-4"
        >
          A glimpse into our delicious offerings
        </motion.p>
      </div>

      <div className="w-full justify-center">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full mx-auto md:px-4 max-w-[800px] xl:max-w-[1000px]"
          >
            <Skeleton height="h-96" className="rounded-lg" />
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:block w-full object-cover overflow-hidden mx-auto md:px-4 max-w-[800px] xl:max-w-[1000px]"
            >
              <motion.img
                src={svgImg.gallery}
                alt="gallary"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:hidden flex justify-center items-center w-full mx-auto"
            >
              <motion.img
                src={svgImg.mobileGallery}
                alt="gallary"
                className="object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
