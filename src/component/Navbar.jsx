import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { svgImg } from "../assets/svgImg";
import { IoMdCart } from "react-icons/io";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowRightWideFill } from "react-icons/ri";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { useCart } from "../context/CartProvider";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { formatCurrency, cartCount, cartTotal } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      // Lock scroll position
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  // Animation variants
  const navVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const mobileItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
    tap: { scale: 0.98 },
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    hover: { scale: 1.1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3, repeat: 1 },
    },
  };

  return (
    <>
      {/* Mobile Menu Portal - Rendered outside navbar to avoid z-index issues */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Menu Panel - Full Width */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-[10000] overflow-y-auto"
            >
              <div className="flex flex-col  min-h-full pt-4 pb-8">
                {/* Header with Logo and Close Button */}
                <div className="flex justify-between items-center px-6 pb-6 border-b border-gray-200">
                  <motion.img
                    src={svgImg.beiroot}
                    alt="beiroot"
                    onClick={() => {
                      setIsMobileOpen(false);
                      navigate("/");
                    }}
                    className="h-[45px] sm:h-[50px] object-cover cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  <motion.button
                    onClick={() => setIsMobileOpen(false)}
                    whileTap={{ scale: 0.95, rotate: 90 }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ scale: 0.95, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 text-dark hover:text-primary-500 transition-colors"
                  >
                    <IoCloseSharp className="text-2xl" />
                  </motion.button>
                </div>

                <div className="flex flex-col gap-6 w-full px-6 mt-2">
                  {/* Navigation Links */}
                  <ul className="flex flex-col w-full">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.path}
                        variants={mobileItemVariants}
                        className="border-b border-gray-200 w-full"
                      >
                        <NavLink
                          to={item.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={({ isActive }) =>
                            twMerge(
                              "text-dark text-[20px] sm:text-[24px] flex justify-between items-center py-5 font-semibold w-full hover:text-primary-500 transition-colors duration-300",
                              isActive && "text-primary-500",
                            )
                          }
                        >
                          {item.name}
                          <RiArrowRightWideFill className="ml-2 text-2xl transition-transform duration-300 group-hover:translate-x-1" />
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Order Now Button */}
                  <motion.button
                    variants={mobileItemVariants}
                    onClick={() => {
                      setIsMobileOpen(false);
                      navigate("/menu");
                      setTimeout(() => {
                        const element = document.getElementById("order-now");
                        if (element)
                          element.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }}
                    className="bg-gradient-primary cursor-pointer text-white px-6 h-[60px] sm:h-[65px] w-full rounded-md flex items-center justify-center text-lg font-medium  transition-shadow mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Order Now
                  </motion.button>

                  {/* Cart Button */}
                  <motion.button
                    variants={mobileItemVariants}
                    onClick={() => {
                      setIsMobileOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 transition-all h-[55px] sm:h-[60px] flex items-center justify-center rounded-md border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 text-dark font-bold text-lg">
                      <span>{formatCurrency(cartTotal)}</span>
                      <div className="relative">
                        <IoMdCart className="text-[24px] sm:text-[26px]" />
                        {cartCount > 0 && (
                          <span className="absolute -top-2 -right-1.5 font-bold bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center border-2 border-gray-100">
                            {cartCount > 99 ? "99+" : cartCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>

                  {/* Social Icons */}
                  <motion.div
                    variants={mobileItemVariants}
                    className="flex justify-center items-center gap-8 mt-10 pt-6 border-t border-gray-200"
                  >
                    <motion.a
                      href="https://www.instagram.com/beiroot/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[50px] w-[50px] rounded-full bg-secondary-500 text-shade  flex items-center justify-center transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="text-[26px] text-shad" />
                    </motion.a>
                    <motion.a
                      href="https://www.tiktok.com/@beiroot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[50px] w-[50px] rounded-full bg-secondary-500 text-shade  flex items-center justify-center transition-all"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTiktok className="text-[24px] text-shade" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Elements */}
            </motion.div>

            {/* Floating WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed bottom-6 border border-gray-300 right-4 z-[10000] cursor-pointer"
              onClick={() =>
                window.open("https://wa.me/2348034567890", "_blank")
              }
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                y: [0, -8, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              <img
                src={svgImg.whatsappIcon}
                alt="WhatsApp"
                className="w-[55px] z-500 sm:w-[60px]"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        variants={navVariants}
        initial="initial"
        animate="animate"
        className={twMerge(
          "relative max-w-[1440px] w-full mx-auto sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white shadow-md",
        )}
      >
        {/* Desktop Navbar */}
        <div className="hidden lg:flex max-w-[1200px] mx-auto w-full py-3 sm:py-4 justify-between items-center px-4 xl:px-0">
          <motion.img
            src={svgImg.beiroot}
            alt="beiroot"
            onClick={() => navigate("/")}
            className="h-[50px] sm:h-[55px] md:h-[65px] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />

          <ul className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    twMerge(
                      "relative text-dark text-[16px] lg:text-[18px] font-semibold transition-all duration-300 group",
                      isActive && "text-primary-500",
                    )
                  }
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: location.pathname === item.path ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              </motion.li>
            ))}
          </ul>

          <div className="flex gap-3 sm:gap-4 md:gap-[24px] items-center">
            <motion.button
              className="relative flex items-center justify-center px-[16px] sm:px-[20px] md:px-[24px] h-[45px] sm:h-[50px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] rounded-full hover:bg-gray-50 transition-colors duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => navigate("/checkout")}
            >
              <div className="relative flex items-center gap-2">
                <span className="hidden sm:inline text-dark font-medium">
                  {formatCurrency(cartTotal)}
                </span>
                <span className="sm:hidden text-dark font-medium">
                  {formatCurrency(cartTotal)}
                </span>
                <div className="relative">
                  <IoMdCart className="text-xl sm:text-2xl text-dark" />
                  {cartCount > 0 && (
                    <motion.span
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate={cartCount > 0 ? ["animate", "pulse"] : "initial"}
                      whileHover="hover"
                      className="absolute -top-2 -right-2 border-2 border-white bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => {
                navigate("/menu");
                setTimeout(() => {
                  const element = document.getElementById("order-now");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="bg-gradient-primary cursor-pointer text-white px-[16px] sm:px-[20px] md:px-[24px] h-[45px] sm:h-[50px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] max-h-fit rounded-full flex items-center justify-center text-sm sm:text-base md:text-base font-medium whitespace-nowrap shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              Order Now
            </motion.button>
          </div>
        </div>

        {/* Mobile Header - White Background */}
        <div className="lg:hidden">
          <div
            className={twMerge(
              "flex justify-between items-center px-4 py-3 transition-all duration-300 bg-white",
              scrolled && "bg-white/95 backdrop-blur-lg shadow-sm",
            )}
          >
            <motion.img
              src={svgImg.beiroot}
              alt="beiroot"
              onClick={() => navigate("/")}
              className="h-[35px] sm:h-[40px] object-cover cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />

            <div className="flex gap-3  sm:gap-4 items-center">
              <motion.button
                onClick={() => navigate("/checkout")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="w-[24px] relative">
                  {" "}
                  <IoMdCart className="text-[24px] text-dark" />
                  {cartCount > 0 && (
                    <motion.span
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate={cartCount > 0 ? "animate" : "initial"}
                      className="absolute right-0 -top-3  font-bold border-2 border-white bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-6 w-6 sm:h-5 sm:w-5 flex items-center justify-center"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.95 }}
                className="p-1"
              >
                <AnimatePresence mode="wait">
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoCloseSharp className="text-[22px] sm:text-[24px] text-dark" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineMenuUnfold className="text-[22px] sm:text-[24px] text-dark" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
