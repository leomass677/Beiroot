import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Skeleton from "./Skeleton";
import { ContactInformationData } from "../data/exploreData";

const ContactInformation = ({ isLoading = false }) => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Function to handle click for different contact types
  const handleContactClick = (info) => {
    if (!info.isLink || !info.action) return;

    if (info.type === "Email") {
      // For email, use mailto protocol
      window.open(`mailto:${info.value}`, "_self");
    } else if (info.type === "Phone") {
      window.open(`tel:${info.value.replace(/\s/g, "")}`, "_self");
    } else if (info.type === "WhatsApp") {
      window.open(`https://wa.me/${info.value.replace(/\s/g, "")}`, "_blank");
    } else if (info.type === "Address") {
      window.open(
        `https://maps.google.com/?q=${encodeURIComponent(info.value)}`,
        "_blank",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col justify-center text-center gap-4">
          <Skeleton className="w-48 h-6 mx-auto" />
          <Skeleton className="w-64 h-4 mx-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-start justify-start gap-2">
              <Skeleton className="w-11 h-11 rounded" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-24 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="flex flex-col gap-8 lg:gap-12"
    >
      <motion.div
        variants={headerVariants}
        className="flex flex-col justify-center text-center gap-4"
      >
        <h4 className="text-lg md:text-xl font-medium text-dark">
          Contact Information
        </h4>
        <p>Get in touch with us for any inquiries or assistance.</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 gap-4"
      >
        {ContactInformationData.map((info) => (
          <motion.div
            key={info.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-start justify-start gap-2"
          >
            <img
              src={info?.icon}
              alt={info?.type}
              className="w-[44px] object-cover h-auto"
            />

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base text-dark">{info?.type}</h3>
              {info.isLink && info.action ? (
                <button
                  onClick={() => handleContactClick(info)}
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors text-left cursor-pointer"
                >
                  {info?.value}
                </button>
              ) : (
                <p className="text-sm text-gray-600">{info?.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ContactInformation;
