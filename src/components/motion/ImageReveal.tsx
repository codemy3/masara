"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  delay = 0,
  duration = 1.6,
  direction = "up",
  priority = false,
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Clip paths for 4 directions
  const clipPaths = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 0 0 100%)",
    right: "inset(0 100% 0 0)",
    visible: "inset(0% 0 0 0)", // fully revealed
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden group", className)}>
      <motion.div
        className="absolute inset-0 z-10 w-full h-full"
        initial={{ clipPath: clipPaths[direction] }}
        animate={{ clipPath: isInView ? clipPaths.visible : clipPaths[direction] }}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: isInView ? 1 : 1.2 }}
          transition={{ duration: duration * 1.2, delay, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn("object-cover transition-transform duration-1000 ease-out group-hover:scale-105", imageClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
