import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  IoHome,
  IoRefresh,
  IoArrowBack,
  IoWarningOutline,
  IoBugOutline,
} from "react-icons/io5";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    // Here you could send error to logging service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          retryCount={this.state.retryCount}
        />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error, onRetry, retryCount = 0 }) => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.3 },
    },
    shake: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4"
    >
      <div className="w-full text-center min-w-[800px] space-y-8">
        {/* Animated Background Circles */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Error Icon with Animation */}
        <motion.div
          variants={iconVariants}
          animate={["visible", "shake"]}
          className="relative mx-auto w-28 h-28"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 rounded-full shadow-lg" />
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute -inset-1 bg-red-400 rounded-full opacity-20"
          />
          <div className="relative w-full h-full flex items-center justify-center">
            <IoWarningOutline className="w-14 h-14 text-red-500" />
          </div>

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-400 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i - 1) * 15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>

        {/* Error Message */}
        <motion.div
          variants={itemVariants}
          className="space-y-3 w-full min-w-[600px]"
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Oops! Something Went Wrong
          </motion.h1>
          <motion.p
            className="text-gray-500 text-base leading-relaxed max-w-md mx-auto"
            variants={itemVariants}
          >
            We apologize for the inconvenience. Our team has been notified and
            is working to fix the issue.
          </motion.p>
        </motion.div>

        {/* Error Code */}
        {retryCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-gray-100 rounded-lg p-3 max-w-md mx-auto"
          >
            <code className="text-xs text-gray-600">
              Error ID: ERR-{retryCount}-RETRY
            </code>
          </motion.div>
        )}

        {/* Error Details (Development Only) */}
        {import.meta.env.DEV && error && (
          <motion.details
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-left bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm max-w-2xl mx-auto"
          >
            <summary className="cursor-pointer font-medium text-gray-700 p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2">
              <IoBugOutline className="text-primary-500" />
              Technical Details (Development Only)
            </summary>
            <div className="p-4 bg-gray-50">
              <pre className="text-red-600 whitespace-pre-wrap text-xs font-mono">
                {error.toString()}
              </pre>
              {error.stack && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-gray-500">
                    Stack Trace
                  </summary>
                  <pre className="text-gray-500 whitespace-pre-wrap text-xs mt-2 font-mono">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          </motion.details>
        )}

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
        >
          <motion.button
            onClick={onRetry}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            <motion.div
              animate={retryCount > 0 ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <IoRefresh className="text-lg" />
            </motion.div>
            Try Again
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
          >
            <IoArrowBack className="text-lg" />
            Go Back
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex w-24 items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            <IoHome className="text-lg" />
            Home
          </motion.button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          variants={itemVariants}
          className="text-xs text-gray-400 pt-4"
        >
          If the problem persists, please contact our support team or try again
          later.
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-primary-300"
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorBoundary;
