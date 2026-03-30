import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { svgImg } from "../assets/svgImg";
import { IoMdCart } from "react-icons/io";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowRightWideFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { useCart } from "../context/CartProvider";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { formatCurrency } = useCart();
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
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "checkout", path: "/checkout" },
  ];

  // Animation variants
  const navVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
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
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={twMerge(
        "relative max-w-[1440px] w-full overflow-hidden mx-auto sticky top-0 shadow-md bg-surface z-50 transition-all duration-300",
        scrolled && "shadow-lg bg-surface/95 backdrop-blur-sm",
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
          {navItems
            .filter((item) => item.path !== "/checkout")
            .map((item, index) => (
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
                      "text-dark text-[16px] lg:text-[18px] font-semibold hover:text-primary-500 transition-colors duration-300",
                      isActive && "text-primary-500",
                    )
                  }
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
        </ul>

        <div className="flex gap-3 sm:gap-4 md:gap-[24px] items-center">
          <motion.button
            className="flex items-center justify-center px-[16px] sm:px-[20px] md:px-[24px] h-[45px] sm:h-[50px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] backdrop-blur-xs rounded-full"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                twMerge(
                  "relative flex text-dark justify-center items-center text-sm sm:text-base md:text-md font-medium gap-1",
                  isActive && "font-semibold",
                )
              }
            >
              <span className="hidden sm:inline">{formatCurrency(24000)}</span>
              <span className="sm:hidden">{formatCurrency(24000)}</span>
              <div className="relative">
                <IoMdCart className="text-xl sm:text-2xl text-dark" />
                <motion.span
                  variants={cartBadgeVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="absolute -top-2 -right-2 border-2 border-shade bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center"
                >
                  0
                </motion.span>
              </div>
            </NavLink>
          </motion.button>

          <motion.button
            onClick={() => {
              navigate("/menu");
              setTimeout(() => {
                const element = document.getElementById("order-now");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="bg-gradient-primary cursor-pointer text-surface px-[16px] sm:px-[20px] md:px-[24px] h-[45px] sm:h-[50px] md:h-[60px] py-[12px] sm:py-[14px] md:py-[16px] max-h-fit rounded-full flex items-center justify-center text-sm sm:text-base md:text-base font-medium whitespace-nowrap"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Order Now
          </motion.button>
        </div>
      </div>

      {/* Mobile Section */}
      <section className="block lg:hidden">
        <div className="flex sticky top-0 z-20 bg-surface max-h-[60px] justify-between items-center px-3 sm:px-4 py-3 sm:py-4">
          <motion.img
            src={svgImg.beiroot}
            alt="beiroot"
            onClick={() => navigate("/")}
            className="h-[35px] sm:h-[40px] object-cover cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />

          <div className="flex flex-row-reverse gap-3 sm:gap-4 items-center">
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileTap={{ scale: 0.95 }}
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

            <motion.button
              className="flex items-center justify-center h-full backdrop-blur-xs rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/checkout"
                className={({ isActive }) =>
                  twMerge(
                    "relative flex text-dark justify-center items-center text-md font-medium",
                    isActive && "font-semibold",
                  )
                }
              >
                <div className="relative">
                  <IoMdCart className="text-[22px] sm:text-[24px] text-dark" />
                  <motion.span
                    variants={cartBadgeVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute -top-2 -right-1.5 text-xxs font-bold border-2 border-shade bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center"
                  >
                    0
                  </motion.span>
                </div>
              </NavLink>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 top-[60px] lg:hidden z-40"
            >
              <div className="bg-dark h-[calc(100vh-60px)] overflow-y-auto shadow-lg">
                <div className="flex flex-col items-start gap-4 sm:gap-6 py-4 w-full px-4">
                  <ul className="flex flex-col items-start w-full">
                    {navItems
                      .filter((item) => item.path !== "/checkout")
                      .map((item) => (
                        <motion.li
                          key={item.path}
                          variants={mobileItemVariants}
                          className="border-b border-gray-50/50 w-full"
                        >
                          <NavLink
                            to={item.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                              twMerge(
                                "text-surface text-[18px] sm:text-[20px] flex justify-between items-center py-4 font-semibold w-full",
                                isActive && "text-primary-500",
                              )
                            }
                          >
                            {item.name}
                            <RiArrowRightWideFill className="ml-2 text-xl" />
                          </NavLink>
                        </motion.li>
                      ))}
                  </ul>

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
                    className="bg-gradient-primary cursor-pointer text-surface px-[24px] h-[55px] sm:h-[60px] py-[14px] sm:py-[16px] w-full max-h-fit rounded-xs flex items-center justify-center text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Order Now
                  </motion.button>

                  <motion.button
                    variants={mobileItemVariants}
                    onClick={() => {
                      setIsMobileOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-surface h-[50px] sm:h-[54px] flex items-center justify-center z-20 rounded-xs"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to="/checkout"
                      className="relative flex h-full w-full text-dark justify-center gap-2 font-bold items-center text-md font-medium"
                    >
                      {formatCurrency(24000)}
                      <span className="relative">
                        <IoMdCart className="text-[22px] sm:text-[24px] text-dark" />
                        <span className="absolute -top-2 -right-1.5 text-xxs font-bold border-2 border-shade bg-primary-600 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                          0
                        </span>
                      </span>
                    </NavLink>
                  </motion.button>

                  {/* Social Icons */}
                  <motion.div
                    variants={mobileItemVariants}
                    className="flex justify-center items-center gap-4 mt-4 w-full"
                  >
                    <motion.a
                      href="https://www.instagram.com/beiroot/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] relative rounded-full bg-surface flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="text-[24px] sm:text-[28px] text-dark" />
                    </motion.a>
                    <motion.a
                      href="https://www.tiktok.com/@beiroot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] relative rounded-full bg-surface flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTiktok className="text-[20px] sm:text-[24px] text-dark" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Images */}
              <div className="pointer-events-none">
                <img
                  src={svgImg.menuSvg}
                  alt="Menu"
                  className="w-full absolute -bottom-1 left-0 object-cover"
                />
                <motion.img
                  src={svgImg.whatsappIcon}
                  alt="WhatsApp"
                  className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 z-50 w-[45px] sm:w-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    },
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.nav>
  );
};

export default Navbar;
