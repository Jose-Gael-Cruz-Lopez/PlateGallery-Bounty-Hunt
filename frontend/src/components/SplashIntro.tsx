import { useState } from "react";
import { motion } from "framer-motion";

export function SplashIntro({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <div className={`pg-stage${booted ? " pg-stage--done" : ""}`}>
      <motion.div
        className={`pg-screen${booted ? " pg-screen--done" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onAnimationComplete={() => setBooted(true)}
      >
        {children}
      </motion.div>
    </div>
  );
}
