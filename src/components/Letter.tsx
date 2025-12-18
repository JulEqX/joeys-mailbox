import { motion } from 'motion/react';
import type { Mail } from '../models/Mail';

interface LetterProps {
  mail: Mail;
  isVisible: boolean;
}

export default function Letter({ mail, isVisible }: LetterProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
      animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
      exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
      transition={{ 
        delay: 0.75,
        type: 'spring', 
        stiffness: 200, 
        damping: 25 
      }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '700px',
        maxWidth: '90vw',
        height: '80vh',
        maxHeight: '800px',
        background: '#fffef8',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        border: '2px solid #e8d5c4',
        padding: '48px',
        overflowY: 'auto',
        zIndex: 1001,
      }}
    >
      <h2 style={{ 
        margin: '0 0 24px',
        fontSize: '36px',
        color: '#5a3e2b',
        fontWeight: 700, 
        textAlign: 'center' 
      }}>
        {mail.title}
      </h2>
      <p style={{ 
        margin: '0 0 32px', 
        fontSize: '16px', 
        color: '#8b6f47', 
        fontStyle: 'italic', 
        textAlign: 'center' 
      }}>
        {mail.date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
      <div style={{ 
        fontSize: '18px', 
        color: '#3a2a1a', 
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
      }}>
        {mail.content}
      </div>
    </motion.div>
  );
}
