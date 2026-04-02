import React, { useState } from "react";
import { FiCheckCircle, FiXCircle, FiSend, FiLoader } from "react-icons/fi";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      // Error
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[500px] w-full mx-auto px-4 ">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-lg md:text-xl font-semibold text-dark mb-2">
          Send Us a Message
        </h2>
        <p className="text-base text-gray-600">
          Have a question or feedback? We'd love to hear from you
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
          <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Message sent successfully! We'll get back to you soon.</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg--50 border border-primary-200 rounded-lg text-primary-500 text-sm flex items-center gap-2">
          <FiXCircle className="w-5 h-5 flex-shrink-0" />
          <span>Failed to send message. Please try again later.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name <span className="text-primary-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Muktar Adamu"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 outline-none rounded-md border-[1.5px] border-secondary-300 ${
              errors.name ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-primary-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email <span className="text-primary-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="muktaradamu@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.email ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-primary-500 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject <span className="text-primary-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.subject ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="text-sm text-primary-500 mt-1">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field with Max Height */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message <span className="text-primary-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows="6"
            className={`w-full px-4 py-2.5 rounded-md border-[1.5px] border-secondary-300 ${
              errors.message ? "border-primary-500" : "secondary-300"
            } focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors resize-y max-h-48 overflow-y-auto disabled:bg-gray-100 disabled:cursor-not-allowed`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-primary-500 mt-1">
              {errors.message}
            </p>
          )}
          {/* Character counter */}
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {formData.message.length} characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-primary hover:scale-101 transition-all duration-300 ease-in hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FiSend className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
