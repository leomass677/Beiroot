import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const Skeleton = ({
  width = "w-full",
  height = "h-4",
  className = "",
  variant = "default",
  count = 1,
  circle = false,
}) => {
  const skeletonVariants = {
    default: "bg-primary-100",
    light: "bg-primary-50",
  };

  const baseClasses = clsx(
    "animate-pulse rounded-md",
    skeletonVariants[variant] || skeletonVariants.default,
    circle && "rounded-full",
    width,
    height,
    className,
  );

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            layoutId={`skeleton-${i}`}
            className={baseClasses}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Preset skeleton compositions
export const CardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height="h-40" className="rounded-lg" />
    <Skeleton height="h-4" width="w-3/4" />
    <Skeleton height="h-4" width="w-1/2" />
  </div>
);

export const TextSkeleton = ({ lines = 3 }) => (
  <Skeleton count={lines} height="h-4" className="w-full" />
);

export const MenuItemSkeleton = () => (
  <div className="space-y-3">
    <Skeleton height="h-48" className="rounded-lg" />
    <Skeleton height="h-5" width="w-4/5" />
    <Skeleton height="h-4" width="w-3/5" />
    <Skeleton height="h-5" width="w-2/5" />
  </div>
);

export const CircleAvatarSkeleton = () => (
  <Skeleton height="h-12 w-12" circle variant="default" />
);

export const CustomSkeleton = CardSkeleton;

export default Skeleton;
