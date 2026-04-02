import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "./Skeleton";
import { FiCheckCircle, FiXCircle, FiSend, FiLoader } from "react-icons/fi";

const Form = ({ isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    // Sanitize inputs
    const sanitizedName = formData.name.trim();
    const sanitizedEmail = formData.email.trim().toLowerCase();
    const sanitizedSubject = formData.subject.trim();
    const sanitizedMessage = formData.message.trim();

    // Name validation
    if (!sanitizedName) {
      newErrors.name = "Name is required";
    } else if (sanitizedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (sanitizedName.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(sanitizedName)) {
      newErrors.name =
        "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Email validation
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      newErrors.email = "Please enter a valid email address";
    } else if (sanitizedEmail.length > 254) {
      newErrors.email = "Email address is too long";
    }

    // Subject validation
    if (!sanitizedSubject) {
      newErrors.subject = "Subject is required";
    } else if (sanitizedSubject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    } else if (sanitizedSubject.length > 100) {
      newErrors.subject = "Subject must be less than 100 characters";
    }

    // Message validation
    if (!sanitizedMessage) {
      newErrors.message = "Message is required";
    } else if (sanitizedMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (sanitizedMessage.length > 2000) {
      newErrors.message = "Message must be less than 2000 characters";
    }

    // Check for suspicious content
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    const allText = `${sanitizedName} ${sanitizedEmail} ${sanitizedSubject} ${sanitizedMessage}`;
    if (suspiciousPatterns.some((pattern) => pattern.test(allText))) {
      newErrors.general = "Invalid content detected. Please check your input.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rate limiting: max 3 submissions per minute
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;

    if (submitCount >= 3 && timeSinceLastSubmit < 60000) {
      setErrors({
        general:
          "Too many submissions. Please wait a minute before trying again.",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Update rate limiting
      setSubmitCount((prev) => prev + 1);
      setLastSubmitTime(now);

      // Simulate API call - replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitCount(0); // Reset rate limiting on success

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Form submission error:", error);

      // Error
      setSubmitStatus("error");
      setErrors({
        general: error.message.includes("Failed to fetch")
          ? "Network error. Please check your connection and try again."
          : "Failed to send message. Please try again later.",
      });

      setTimeout(() => {
        setSubmitStatus(null);
        setErrors({});
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const statusVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    hover: { scale: 1.005, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const errorVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="max-w-[500px] w-full mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        variants={headerVariants}
        className="text-center mb-8 md:mb-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl font-semibold text-dark mb-2"
        >
          Send Us a Message
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base text-gray-600"
        >
          Have a question or feedback? We'd love to hear from you
        </motion.p>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {errors.general && (
          <motion.div
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
          >
            <FiXCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errors.general}</span>
          </motion.div>
        )}

        {submitStatus === "success" && (
          <motion.div
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
            </motion.div>
            <span>Message sent successfully! We'll get back to you soon.</span>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FiXCircle className="w-5 h-5 flex-shrink-0" />
            </motion.div>
            <span>Failed to send message. Please try again later.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        variants={containerVariants}
      >
        {/* Name Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name <span className="text-primary-500">*</span>
          </label>
          <motion.input
            type="text"
            id="name"
            name="name"
            placeholder="Muktar Adamu"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className={`w-full px-4 py-2.5 outline-none rounded-md border-[1.5px] border-secondary-300 ${
              errors.name ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                id="name-error"
                className="text-sm text-primary-500 mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email <span className="text-primary-500">*</span>
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            placeholder="muktaradamu@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.email ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                id="email-error"
                className="text-sm text-primary-500 mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subject Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject <span className="text-primary-500">*</span>
          </label>
          <motion.input
            type="text"
            id="subject"
            name="subject"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.subject ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                id="subject-error"
                className="text-sm text-primary-500 mt-1"
              >
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Field with Max Height */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message <span className="text-primary-500">*</span>
          </label>
          <motion.textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows="6"
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.message ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors resize-y max-h-48 overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                id="message-error"
                className="text-sm text-primary-500 mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
          {/* Character counter */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              key={formData.message.length}
              initial={{ scale: 1.2, color: "#f59e0b" }}
              animate={{ scale: 1, color: "#6b7280" }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-500"
            >
              {formData.message.length} characters
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-primary transition-all duration-300 ease-in hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FiLoader className="w-5 h-5" />
                </motion.div>
                <span>Sending...</span>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiSend className="w-5 h-5" />
                </motion.div>
                <span>Send Message</span>
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Form;
