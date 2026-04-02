import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate, useRouteError } from "react-router-dom";
import { IoHome, IoRefresh, IoArrowBack, IoWarning } from "react-icons/io5";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const isDev = import.meta.env.DEV;

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        icon: "🔍",
      };
    }
    if (error?.status === 500) {
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        icon: "⚠️",
      };
    }
    return {
      title: "Something went wrong",
      message: "We encountered an unexpected error. Please try again.",
      icon: "😵",
    };
  };

  const { title, message, icon } = getErrorMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface to-shade px-4"
    >
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto text-6xl"
        >
          {icon}
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-dark">{title}</h1>
          <p className="text-gray-600">{message}</p>
          {error?.status && (
            <p className="text-sm text-gray-500">Error {error.status}</p>
          )}
          {isDev && error && (
            <pre className="mt-4 text-left text-xs text-gray-400 max-h-48 overflow-auto whitespace-pre-wrap break-words">
              {error?.message || JSON.stringify(error, null, 2)}
            </pre>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <IoRefresh className="text-lg" />
            Refresh Page
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            <IoArrowBack className="text-lg" />
            Go Back
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-600 transition-colors"
          >
            <IoHome className="text-lg" />
            Home
          </motion.button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-2">Need help?</p>
          <p className="text-sm text-gray-600">
            Contact us at{" "}
            <a
              href="tel:+2348034567890"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              +234 803 456 7890
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
