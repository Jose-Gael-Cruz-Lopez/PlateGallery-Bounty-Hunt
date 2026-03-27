import { useState } from "react";
import { motion } from "framer-motion";

/**
 * SplashIntro — "car tablet boot" animation.
 *
 * On first load the entire app appears as a small rounded screen
 * sitting in a dark car-interior backdrop.  It then zooms forward
 * (scale 0.66 → 1.0, border-radius 30px → 0) to fill the viewport,
 * mimicking a dashboard screen powering on.
 *
 * Once animation completes the wrapper is removed from the layout
 * tree so normal page scrolling resumes without any overhead.
 */
export function SplashIntro({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <div className={`pg-stage${booted ? " pg-stage--done" : ""}`}>
      <motion.div
        className={`pg-screen${booted ? " pg-screen--done" : ""}`}
        initial={{
          scale: 0.66,
          borderRadius: "30px",
          opacity: 0,
          boxShadow:
            "0 0 0 1.5px rgba(255,255,255,0.09), 0 60px 160px rgba(0,0,0,0.90)",
        }}
        animate={{
          scale: 1.0,
          borderRadius: "0px",
          opacity: 1,
          boxShadow:
            "0 0 0 0px rgba(255,255,255,0.00), 0 0px 0px rgba(0,0,0,0.00)",
        }}
        transition={{
          scale: {
            duration: 1.35,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.14,
          },
          borderRadius: {
            duration: 1.35,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.14,
          },
          opacity: {
            duration: 0.40,
            ease: "easeOut",
            delay: 0.05,
          },
          boxShadow: {
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.14,
          },
        }}
        onAnimationComplete={() => setBooted(true)}
      >
        {children}
      </motion.div>
    </div>
  );
}
