import { motion } from "motion/react";

export default function EnvelopeBase() {
  return (
    <>
      <motion.div
        className="envelope-container"
        initial="idle"
        whileHover="hover"
        // exit="idle"
        animate="idle"
      >
        <motion.div
          className="envelope-flap"
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
          className="envelope-letter"
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
        <motion.div className="envelope-pocket" />
      </motion.div>
    </>
  );
}
