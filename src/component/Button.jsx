import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disable = false,
  icon: Icon,
  iconPosition = "right",
  to: linkTo,
  scrollTarget,
  rounded = "md",
}) => {
  const baseStyles =
    "inline-flex items-center cursor-pointer justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variants = {
    primary: "btn-primary  ",
    secondary: "btn-secondary ",
    danger: "bg-primary text-shade  ",
    outline: "bg-primary text-shade  ",
    gradient: "",
  };

  const sizes = {
    xs: "px-1 px-1 text-sm",
    sm: "px-3 px-1 text-sm",
    md: "px-4 px-2 text-base",
    lg: "px-5 px-3 text-lg",
  };

  const roundeds = {
    xs: "px-1 px-1 text-sm",
    sm: "px-3 px-1 text-sm",
    md: "px-4 px-2 text-base",
    lg: "px-5 px-3 text-lg",
    full: "rounded-full",
  };

  const merged = twMerge(
    baseStyles,
    className,
    disable && "opacity-50 cursor-not-allowed",
    variants[variant],
    sizes[size],
    roundeds[rounded],
  );

  const content = (
    <span>
      {Icon && iconPosition === "left" && <Icon className="" />}
      {text}
      {Icon && iconPosition === "right" && <Icon className="" />}
    </span>
  );

  const handleClick = (e) => {
    if (scrollTarget) {
      const scroll = document.getElementById(scrollTarget);
      e.preventDefault();

      if (typeof scrollTarget === "string") {
        scroll.scrollIntoView({ behavior: "smooth" });
      } else if (typeof scrollTarget === "number") {
        window.scrollTo({ top: scrollTarget, behavior: "smooth" });
      } else if (onClick) {
        onClick(e);
      }
    }
  };

  if (linkTo) {
    return (
      <a href={linkTo} className={className} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disable}
      className={merged}
    >
      {content}
    </button>
  );
};

export default Button;
