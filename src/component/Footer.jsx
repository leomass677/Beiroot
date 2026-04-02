import React from "react";
import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { svgImg } from "../assets/svgImg";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-br from-surface/60 from-20% via-gray-50/40 to-shade/75 to-78%  mt-[60px] md:mt-[80px] lg:mt-[100px] border-t border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-10 lg:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-3 md:space-y-4">
            <img src={svgImg.beiroot} alt="brand-logo object-cover w-[180px]" />
            <p className="text-sm md:text-sm text-gray-600 leading-relaxed">
              Freshly prepared meals with authentic flavors. Fast ordering,
              affordable prices, and convenient location in Ilorin.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-gray-100 hover:bg-primary-500 text-gray-600 hover:text-white rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Icon className="text-sm md:text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-2.5">
              {["Home", "Menu", "About", "Contact"].map((link, index) => (
                <li key={index}>
                  <Link
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replace(" ", "")}`
                    }
                    className="text-sm md:text-sm text-gray-600 hover:text-primary-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-primary-500 transition-all duration-200"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Get in Touch
            </h3>
            <ul className="space-y-3 md:space-y-3.5">
              <li className="flex gap-3 text-sm md:text-sm text-gray-600 leading-relaxed">
                <IoLocationOutline className="text-primary-500 text-lg md:text-xl flex-shrink-0 mt-0.5" />
                <span>123 Ahmadu Bello Way, Ilorin, Kwara State</span>
              </li>
              <li className="flex gap-3 text-sm md:text-sm text-gray-600">
                <IoMailOutline className="text-primary-500 text-lg md:text-xl flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@beiroot.com"
                  className="hover:text-primary-500 transition-colors"
                >
                  info@beiroot.com
                </a>
              </li>
              <li className="flex gap-3 text-sm md:text-sm text-gray-600">
                <IoCallOutline className="text-primary-500 text-lg md:text-xl flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+2348034567890"
                  className="hover:text-primary-500 transition-colors"
                >
                  +234 803 456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              Opening Hours
            </h3>
            <ul className="space-y-2 md:space-y-2.5">
              <li className="text-sm md:text-sm text-gray-600">
                <span className="font-medium">Mon - Fri:</span> 09:00 AM - 10:00
                PM
              </li>
              <li className="text-sm md:text-sm text-gray-600">
                <span className="font-medium">Saturday:</span> 10:00 AM - 11:00
                PM
              </li>
              <li className="text-sm md:text-sm text-gray-600">
                <span className="font-medium">Sunday:</span> 10:00 AM - 11:00 PM
              </li>
            </ul>
            {/* Status Badge */}
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs text-gray-500">Currently Open</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-xs md:text-xs text-gray-500">
              © 2026 Beiroot. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs md:text-xs text-gray-500 hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs md:text-xs text-gray-500 hover:text-primary-500 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
