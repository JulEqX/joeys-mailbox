import { AnimatePresence, motion } from "motion/react";
import { hidden, shown, type Mail } from "../models/Mail";

interface LetterProps {
  mail: Mail;
  onClose?: () => void;
}

export default function Letter({ mail, onClose }: LetterProps) {
  return (
    <>
      <motion.div
        className="backdrop"
        initial={{ ...hidden }}
        animate={{ ...shown }}
        exit={{ ...hidden }}
        transition={{ duration: 0.1 }}
        onClick={onClose}
      />
      <motion.div
        initial={{ ...hidden, top: "-100%", left: "50%" }}
        animate={{ ...shown, top: "50%", left: "50%" }}
        exit={{ ...hidden, top: "-100%", left: "50%" }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className="overlay"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="letter-title">{mail.title}</h2>
        <p className="letter-subtitle">
          {mail.date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="letter-body">{mail.content}</p>
        <div></div>
      </motion.div>
    </>
  );
}
