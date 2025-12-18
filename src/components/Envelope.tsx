import { motion, AnimatePresence } from 'motion/react';
import type { Mail } from '../models/Mail';
import Letter from './Letter';

type EnvelopeState = 'small' | 'enlarged' | 'opened';

interface EnvelopeProps {
  mail: Mail;
  state: EnvelopeState;
  onEnvelopeClick: () => void;
  onBackgroundClick: () => void;
  layoutId: string;
}

export default function Envelope({ mail, state, onEnvelopeClick, onBackgroundClick, layoutId }: EnvelopeProps) {
  const handleEnvelopeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onEnvelopeClick();
  };

  const isExpanded = state === 'enlarged' || state === 'opened';

  return (
    <>
      {isExpanded && (
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
      )}
      
      <Letter mail={mail} isVisible={state === 'opened'} />

      <motion.div
        layout
        layoutId={layoutId}
        onClick={handleEnvelopeClick}
        initial={false}
        animate={{
          width: isExpanded ? 400 : 200,
          height: isExpanded ? 240 : 120,
          position: isExpanded ? 'fixed' : 'relative',
          top: isExpanded ? '50%' : 'auto',
          left: isExpanded ? '50%' : 'auto',
          x: isExpanded ? '-50%' : 0,
          y: isExpanded ? (state === 'opened' ? '-120%' : '-50%') : 0,
          zIndex: isExpanded ? 1000 : 'auto',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          layout: {
            type: 'spring',
            stiffness: 300,
            damping: 30
          }
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <motion.div
            className="envelope-body"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 100%)',
              borderRadius: '8px',
              position: 'relative',
              boxShadow: isExpanded ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.1)',
              border: isExpanded ? '3px solid #c19a6b' : '2px solid #c19a6b',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(180deg, rgba(193, 154, 107, 0.3) 0%, transparent 100%)',
              clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
            }} />

            <motion.div
              className="envelope-flap"
              animate={{
                rotateX: state === 'opened' ? -180 : 0,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 20,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50%',
                background: 'linear-gradient(180deg, #c19a6b 0%, #d4a574 100%)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                zIndex: 2,
                display: isExpanded ? 'block' : 'none',
              }}
            />
            
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(0deg, rgba(193, 154, 107, 0.3) 0%, transparent 100%)',
              clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
              display: isExpanded ? 'block' : 'none',
            }} />

            <div style={{
              padding: isExpanded ? '32px' : '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: state === 'enlarged' ? 'center' : 'flex-end',
              alignItems: state === 'enlarged' ? 'center' : 'flex-start',
              height: '100%',
            }}>
              <motion.h3 
                layout
                style={{ 
                  margin: 0, 
                  fontSize: isExpanded ? '24px' : '14px', 
                  color: '#5a3e2b', 
                  fontWeight: 600 
                }}
              >
                {mail.title}
              </motion.h3>
              <motion.p 
                layout
                style={{ 
                  margin: isExpanded ? '12px 0 0' : '4px 0 0', 
                  fontSize: isExpanded ? '16px' : '11px', 
                  color: '#8b6f47',
                  opacity: isExpanded ? 1 : 0.8
                }}
              >
                {mail.date.toLocaleDateString()}
              </motion.p>
              {state === 'enlarged' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  style={{ 
                    margin: '16px 0 0', 
                    fontSize: '14px', 
                    color: '#8b6f47'
                  }}
                >
                  Click to open
                </motion.p>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {state === 'opened' && (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: [0, 80, 300],
                  opacity: [0, 1, 0]
                }}
                exit={{ 
                  y: [300, 80, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  x: '-50%',
                  width: '90%',
                  height: '280px',
                  background: '#fffef8',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '1px solid #e8d5c4',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}