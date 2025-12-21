import EnvelopeBase from './EnvelopeBase';
import type { EnvelopeBaseProps, EnvelopeDecorationsProps, ThemeStyles } from './EnvelopeBase';

const themeStyles: ThemeStyles = {
  background: 'linear-gradient(135deg, #fff9c4 0%, #ffd54f 50%, #ffb300 100%)',
  border: '#f57f17',
  flapBackground: 'linear-gradient(180deg, #ffd700 0%, #ffb300 100%)',
  topOverlay: 'linear-gradient(180deg, rgba(245, 127, 23, 0.3) 0%, transparent 100%)',
  bottomOverlay: 'linear-gradient(0deg, rgba(245, 127, 23, 0.3) 0%, transparent 100%)',
  textColor: '#f57f17',
  accentColor: '#ff8f00',
};

const NewYearDecorations = ({ isExpanded }: EnvelopeDecorationsProps) => {
  const scale = isExpanded ? 2 : 1;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      {/* Fireworks */}
      <svg
        style={{
          position: 'absolute',
          left: '20%',
          top: '15%',
          width: `${35 * scale}px`,
          height: `${35 * scale}px`,
        }}
        viewBox="0 0 35 35"
      >
        <circle cx="17.5" cy="17.5" r="2" fill="#ffd700" />
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * Math.PI / 180;
          const x1 = 17.5;
          const y1 = 17.5;
          const x2 = 17.5 + Math.cos(angle) * 12;
          const y2 = 17.5 + Math.sin(angle) * 12;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff6f00" strokeWidth="2" />
              <circle cx={x2} cy={y2} r="2" fill="#ffd700" />
            </g>
          );
        })}
      </svg>

      <svg
        style={{
          position: 'absolute',
          right: '15%',
          top: '25%',
          width: `${30 * scale}px`,
          height: `${30 * scale}px`,
        }}
        viewBox="0 0 30 30"
      >
        <circle cx="15" cy="15" r="2" fill="#ff1744" />
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          const x1 = 15;
          const y1 = 15;
          const x2 = 15 + Math.cos(angle) * 10;
          const y2 = 15 + Math.sin(angle) * 10;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff6f00" strokeWidth="1.5" />
              <circle cx={x2} cy={y2} r="1.5" fill="#ff1744" />
            </g>
          );
        })}
      </svg>

      {/* Champagne Bottle & Glasses */}
      <svg
        style={{
          position: 'absolute',
          left: '15%',
          bottom: '20%',
          width: `${40 * scale}px`,
          height: `${35 * scale}px`,
        }}
        viewBox="0 0 40 35"
      >
        {/* Bottle */}
        <rect x="2" y="10" width="8" height="20" fill="#1b5e20" rx="1" />
        <rect x="3" y="8" width="6" height="3" fill="#ffd700" />
        <ellipse cx="6" cy="7" rx="2" ry="1" fill="#424242" />
        <rect x="3" y="12" width="6" height="2" fill="#ffd700" />
        
        {/* Glass 1 */}
        <path d="M15,20 L17,30 L23,30 L25,20 Z" fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth="1" />
        <ellipse cx="20" cy="20" rx="5" ry="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
        <rect x="18.5" y="30" width="3" height="2" fill="#ffffff" opacity="0.3" />
        
        {/* Glass 2 */}
        <path d="M28,22 L30,30 L36,30 L38,22 Z" fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth="1" />
        <ellipse cx="33" cy="22" rx="5" ry="1.5" fill="none" stroke="#ffffff" strokeWidth="1" />
        <rect x="31.5" y="30" width="3" height="2" fill="#ffffff" opacity="0.3" />
        
        {/* Bubbles */}
        <circle cx="8" cy="5" r="1.5" fill="#ffd700" opacity="0.6" />
        <circle cx="11" cy="7" r="1" fill="#ffd700" opacity="0.6" />
        <circle cx="13" cy="4" r="1.2" fill="#ffd700" opacity="0.6" />
      </svg>

      {/* Clock showing midnight */}
      <svg
        style={{
          position: 'absolute',
          right: '18%',
          bottom: '18%',
          width: `${32 * scale}px`,
          height: `${32 * scale}px`,
        }}
        viewBox="0 0 32 32"
      >
        <circle cx="16" cy="16" r="14" fill="#ffffff" stroke="#f57f17" strokeWidth="2" />
        <circle cx="16" cy="16" r="12" fill="none" stroke="#ffd700" strokeWidth="1" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const x = 16 + Math.cos(angle) * 10;
          const y = 16 + Math.sin(angle) * 10;
          return <circle key={i} cx={x} cy={y} r="1" fill="#f57f17" />;
        })}
        <line x1="16" y1="16" x2="16" y2="6" stroke="#f57f17" strokeWidth="2" />
        <line x1="16" y1="16" x2="16" y2="6" stroke="#f57f17" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#f57f17" />
      </svg>

      {/* Stars */}
      {[...Array(8)].map((_, i) => {
        const left = 15 + (i * 13) % 70;
        const top = 10 + (i * 17) % 60;
        const size = 8 + (i % 3) * 3;
        
        return (
          <svg
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: `${size * scale}px`,
              height: `${size * scale}px`,
              opacity: 0.7,
            }}
            viewBox="0 0 24 24"
          >
            <path
              d="M12,2 L14.5,9.5 L22,9.5 L16,14.5 L18.5,22 L12,17 L5.5,22 L8,14.5 L2,9.5 L9.5,9.5 Z"
              fill="#ffd700"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default function NewYearEnvelope(props: EnvelopeBaseProps) {
  return <EnvelopeBase {...props} themeStyles={themeStyles} Decorations={NewYearDecorations} />;
}
