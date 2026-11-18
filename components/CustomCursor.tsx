"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 20,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    // grow the cursor when hovering links / buttons
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setIsHovering(!!target?.closest("a, button, [role='button']"));
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 md:block"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{ scale: isHovering ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full w-full rounded-full border border-red-500"
      >
        <div
          className={`absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
            isHovering ? "bg-red-500/30" : "bg-red-500"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}