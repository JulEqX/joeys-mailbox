import { motion, AnimatePresence, useAnimationControls } from "motion/react";
import type { Mail } from "../../models/Mail";
import Letter from "../Letter";
import { useState } from "react";

const SMALL_SIZE = { width: 200, height: 125 };
const LARGE_SIZE = { width: 400, height: 250 };

export type EnvelopeState = "small" | "enlarged" | "opened";

export interface EnvelopeBaseProps {
  mail: Mail;
  state: EnvelopeState;
  onEnvelopeClick: () => void;
  onBackgroundClick: () => void;
  layoutId: string;
}

export interface ThemeStyles {
  background: string;
  border: string;
  flapBackground: string;
  topOverlay: string;
  bottomOverlay: string;
  textColor: string;
  accentColor: string;
}

export interface EnvelopeDecorationsProps {
  isExpanded: boolean;
}

export default function EnvelopeBase({
  mail,
  state,
  onEnvelopeClick,
  onBackgroundClick,
  layoutId,
  themeStyles,
  Decorations,
}: EnvelopeBaseProps & {
  themeStyles: ThemeStyles;
  Decorations?: React.FC<EnvelopeDecorationsProps>;
}) {
  const [viewState, setViewState] = useState("small");

  const handleEnvelopeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onEnvelopeClick();
  };

  const isExpanded = state === "enlarged" || state === "opened";

  const controls = useAnimationControls();

  const handleClick = () => {
    if (viewState === "small") {
      controls.start("focused");
    } else if (viewState === "focused") {
      controls.start("opened");
    } else if (viewState === "opened") {
      controls.start("small");
    }
  };

  const envelopeVariants = {
    small: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
      },
      position: "static",
    },
    focused: {
      scale: 2,
      transition: {
        duration: 0.5,
      },
    },
    opened: {
      opacity: 0.5,
      x: "50vw",
      y: "50vh",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          layoutId="enevelope"
          className="envelope"
          initial={false}
          animate={controls}
          variants={envelopeVariants}
          style={{
            width: SMALL_SIZE.width,
            height: SMALL_SIZE.height,
            border: `3px solid ${themeStyles.border}`,
          }}
          onClick={handleClick}
          onAnimationComplete={() => {
            console.log("animation completed");
            if (viewState === "small") {
              setViewState("focused");
              console.log("envelope state is now focused");
            } else if (viewState === "focused") {
              setViewState("opened");
              console.log("envelope state is now opened");
            } else if (viewState === "opened") {
              setViewState("small");
              console.log("envelope state is now small");
            }
          }}
        ></motion.div>

        {viewState == "focused" && (
          <motion.div
            layout
            layoutId="envelope"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              position: "absolute",
            }}
          >
            "Hello"
          </motion.div>
        )}
      </AnimatePresence>

      {/* {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onBackgroundClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            cursor: 'pointer',
          }}
        />
      )} */}

      {/* <Letter mail={mail} isVisible={state === 'opened'} />

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: state === 'opened' ? -80 : 0,
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1002,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <h2 style={{ 
            margin: '0 0 8px', 
            fontSize: '32px', 
            color: themeStyles.textColor, 
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            {mail.title}
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: '18px', 
            color: themeStyles.accentColor,
            textShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            {mail.date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>
      )} */}

      {/* <motion.div
        layoutId={layoutId}
        onClick={handleEnvelopeClick}
        initial={false}
        animate={{
          y: isExpanded
            ? state === "opened"
              ? "calc(-50% - 100px)"
              : "-50%"
            : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: isExpanded ? "fixed" : "relative",
          top: isExpanded ? "50%" : "auto",
          left: isExpanded ? "50%" : "auto",
          x: isExpanded ? "-50%" : 0,
          width: isExpanded ? `${LARGE_SIZE.width}px` : `${SMALL_SIZE.width}px`,
          height: isExpanded
            ? `${LARGE_SIZE.height}px`
            : `${SMALL_SIZE.height}px`,
          zIndex: isExpanded ? 1000 : "auto",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            className="envelope-body"
            style={{
              width: "100%",
              height: "100%",
              background: themeStyles.background,
              borderRadius: "8px",
              position: "relative",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              border: `3px solid ${themeStyles.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background: themeStyles.topOverlay,
                clipPath: "polygon(0 0, 50% 50%, 100% 0)",
              }}
            />

            <motion.div
              className="envelope-flap"
              animate={{
                rotateX: state === "opened" ? -180 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background: themeStyles.flapBackground,
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                zIndex: 2,
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background: themeStyles.bottomOverlay,
                clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
              }}
            />

            {Decorations && <Decorations isExpanded={true} />}

            {state === "enlarged" && (
              <div
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: themeStyles.accentColor,
                  }}
                >
                  Click to open
                </motion.p>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {state === "opened" && (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, 80, 300],
                  opacity: [0, 1, 0],
                }}
                exit={{
                  y: [300, 80, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  height: "280px",
                  background: "#fffef8",
                  borderRadius: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "1px solid #e8d5c4",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div> */}

      {/* {state === "small" && (
        <div
          style={{
            marginTop: "12px",
            textAlign: "center",
            width: `${SMALL_SIZE.width}px`,
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "14px",
              color: themeStyles.textColor,
              fontWeight: 600,
            }}
          >
            {mail.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: themeStyles.accentColor,
              opacity: 0.8,
            }}
          >
            {mail.date.toLocaleDateString()}
          </p>
        </div>
      )} */}
    </>
  );
}
