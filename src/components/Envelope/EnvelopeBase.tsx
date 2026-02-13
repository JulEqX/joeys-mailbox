import { motion } from "motion/react";
import React from "react";

interface EnvelopeBaseProp {
  theme: string;
  EnvelopeSealIcon?: React.ComponentType;
}

export default function EnvelopeBase({
  theme,
  EnvelopeSealIcon,
}: EnvelopeBaseProp) {
  return (
    <>
      <motion.div
        className={`envelope-container envelope-container-${theme}`}
        initial="idle"
        whileHover="hover"
        // exit="idle"
        animate="idle"
      >
        {EnvelopeSealIcon && (
          <div className="envelope-seal">
            <EnvelopeSealIcon />
          </div>
        )}
        <motion.div
          className={`envelope-flap envelope-flap-${theme}`}
          variants={{
            idle: {
              rotateX: 0,
              transition: { delay: 0.25, duration: 0.5 },
              zIndex: 1,
            },
            hover: {
              rotateX: -180,
              zIndex: 1,
              transition: { duration: 0.25 },
            },
          }}
        />
        <motion.div
          className={`envelope-letter envelope-letter-${theme}`}
          variants={{
            idle: {
              y: 0,
              transition: { duration: 0.25, type: "tween", ease: "easeInOut" },
              zIndex: 1,
              transitionEnd: {
                zIndex: 0, // applied AFTER rotateX finishes
              },
            },
            hover: {
              y: -50,
              transition: {
                delay: 0.25,
                duration: 0.25,
                type: "tween",
                ease: "easeInOut",
              },
              zIndex: 2,
            },
          }}
        />
        <motion.div className={`envelope-pocket envelope-pocket-${theme}`} />
      </motion.div>
    </>
  );
}
