import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const { formatCurrency } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "checkout", path: "/checkout" },
  ];

  return (
    <nav className="relative max-w-[1440px] overflow-hidden mx-auto sticky top-0 shadow-md bg-surface z-50">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex max-w-[1200px] mx-auto w-full py-4 justify-between items-center">
        <img src={svgImg.beiroot} alt="beiroot" className="h-[65px]" />
        <ul className="flex items-center gap-8">
          {navItems
            .filter((item) => item.path !== "/checkout")
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    twMerge(
                      "text-dark text-[18px] font-semibold",
                      isActive && "text-primary-500",
                    )
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <div className=" flex gap-[24px]">
          {" "}
          <button className="flex items-center justify-center px-[24px] h-full max-[60px] py-[14px] backdrop-blur-xs rounded-full">
            {" "}
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                twMerge(
                  "relative flex text-dark justify-center items-center text-md font-medium",
                  isActive && "font-semibold",
                )
              }
            >
              {" "}
              {formatCurrency(24000)}{" "}
              <IoMdCart className="text-2xl text-dark" />{" "}
              <span className="absolute -top-2 -right-2 border-2 border-shade bg-primary-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {" "}
                0{" "}
              </span>{" "}
            </NavLink>{" "}
          </button>{" "}
          <button className="bg-gradient-primary cursor-pointer text-surface px-[24px] h-[60px] py-[16px] max-h-fit rounded-full flex items-center justify-center">
            {" "}
            Order Now{" "}
          </button>{" "}
        </div>{" "}
      </div>

      {/* Mobile Hamburger */}
      <section className="block lg:hidden">
        <div className="flex sticky top-0 z-20 bg-surface lg:hidden max-h-[60px] justify-between items-center px-4 py-4">
          <img
            src={svgImg.beiroot}
            alt="beiroot"
            className="h-[40px] object-cover"
          />
          {/* left side */}

          <div className="flex flex-row-reverse gap-4">
            <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? (
                <IoCloseSharp className="text-[24px] text-dark" />
              ) : (
                <AiOutlineMenuUnfold className="text-[24px] text-dark" />
              )}
            </button>
            {/*  */}
            <button className="flex items-center justify-center h-full max-[60px]  backdrop-blur-xs rounded-full">
              {" "}
              <NavLink
                to="/checkout"
                className={({ isActive }) =>
                  twMerge(
                    "relative flex text-dark justify-center items-center text-md font-medium",
                    isActive && "font-semibold",
                  )
                }
              >
                <IoMdCart className="text-[24px] text-dark" />{" "}
                <span className="absolute -top-2 -right-1.5 text-xxs font-bold border-2 border-shade bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </NavLink>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileOpen && (
          <div>
            {" "}
            <div className="lg:hidden px-4 bg-dark relative  h-[calc(100vh-60px)] overflow-hidden shadow-lg">
              <div
                className={twMerge(
                  "flex flex-col items-start gap-6 py-4 w-full",
                  !isMobileOpen && "hidden",
                )}
              >
                <ul className="flex  flex-col items-start  py-4 w-full">
                  {navItems
                    .filter((item) => item.path !== "/checkout")
                    .map((item) => (
                      <li
                        key={item.path}
                        className=" border-b-1 py-4  border-gray-50/50 w-full"
                      >
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            twMerge(
                              "text-surface text-[20px] flex justify-between [14px] font-semibold",
                              isActive && "",
                            )
                          }
                        >
                          {item.name}
                          <RiArrowRightWideFill className="ml-2" />
                        </NavLink>
                      </li>
                    ))}
                </ul>
                {/*  */}
                <button className="bg-gradient-primary cursor-pointer text-surface px-[24px] h-[60px] py-[16px] w-full max-h-fit rounded-xs flex items-center justify-center">
                  {" "}
                  Order Now{" "}
                </button>

                <button className="w-full bg-surface h-[54px] flex  items-center justify-center rounded-xs ">
                  {" "}
                  <NavLink
                    to="/checkout"
                    className={({ isActive }) =>
                      twMerge(
                        "relative flex text-dark justify-center gap-2 font-bold items-center text-md font-medium",
                        isActive && "font-semibold",
                      )
                    }
                  >
                    {formatCurrency(24000)}{" "}
                    <IoMdCart className="text-[24px] text-dark" />{" "}
                    <span className="absolute -top-2 -right-1.5 text-xxs font-bold border-2 border-shade bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </NavLink>
                </button>

                {/* instergram and tiktok icons */}
                <div
                  className="flex
              justify-center items-center gap-4 mt-4 w-full
            "
                >
                  <a
                    href="https://www.instagram.com/beiroot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" h-[40px] w-[40px] relative rounded-full bg-surface"
                  >
                    <FaInstagram className="text-[28px] text-dark absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@beiroot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" h-[40px] w-[40px] relative rounded-full bg-surface"
                  >
                    <FaTiktok className="text-[24px] text-dark absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </a>
                </div>
              </div>
            </div>
            {/* button */}
            <div className=" w-full">
              <img
                src={svgImg.menuSvg}
                alt="Menu"
                className="w-full  absolute -bottom-1 left-0 object-cover"
              />

              <img
                src={svgImg.whatsappIcon}
                alt="WhatsApp"
                className="absolute right-4 bottom-10 z-50 "
              />
            </div>
          </div>
        )}
      </section>

      {/* Mobile Menu */}
    </nav>
  );
};

export default Navbar;
