import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { hidden, shown, type Mail } from "../models/Mail";

interface LetterProps {
  mail: Mail;
  onClose?: () => void;
}

const ROTATION_RANGE = 35;
const HALF_ROTATION_RANGE = 35 / 2;

export default function Letter({ mail, onClose }: LetterProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`translate(-50%, -50%) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
        ref={ref}
        initial={{ ...hidden, top: "-100%", left: "50%" }}
        animate={{ ...shown, top: "50%", left: "50%" }}
        exit={{ ...hidden, top: "-100%", left: "50%" }}
        transition={{
          delay: 0.25,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className="overlay"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
      >
        <div className="letter">
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
        </div>
      </motion.div>
    </>
  );
}
