import EnvelopeBase from './EnvelopeBase';
import type { EnvelopeBaseProps, EnvelopeDecorationsProps, ThemeStyles } from './EnvelopeBase';

const themeStyles: ThemeStyles = {
  background: 'linear-gradient(135deg, #ffccbc 0%, #ff7043 25%, #ba68c8 50%, #7e57c2 75%, #42a5f5 100%)',
  border: '#7b1fa2',
  flapBackground: 'linear-gradient(180deg, #9c27b0 0%, #ba68c8 100%)',
  topOverlay: 'linear-gradient(180deg, rgba(156, 39, 176, 0.3) 0%, transparent 100%)',
  bottomOverlay: 'linear-gradient(0deg, rgba(66, 165, 245, 0.3) 0%, transparent 100%)',
  textColor: '#4a148c',
  accentColor: '#7b1fa2',
};

const BirthdayDecorations = ({ isExpanded }: EnvelopeDecorationsProps) => {
  const scale = isExpanded ? 2 : 1;
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <svg
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '15%',
          transform: 'translateX(-50%)',
          width: `${45 * scale}px`,
          height: `${40 * scale}px`,
        }}
        viewBox="0 0 45 40"
      >
        <rect x="5" y="25" width="35" height="12" fill="#ff7043" rx="2" />
        <rect x="8" y="15" width="29" height="10" fill="#ba68c8" rx="1" />
        <rect x="15" y="8" width="15" height="7" fill="#42a5f5" rx="1" />
        
        <rect x="12" y="2" width="2" height="6" fill="#fff9c4" />
        <rect x="21.5" y="0" width="2" height="8" fill="#fff9c4" />
        <rect x="31" y="2" width="2" height="6" fill="#fff9c4" />
        
        <ellipse cx="13" cy="1" rx="2" ry="3" fill="#ff6f00" opacity="0.8" />
        <ellipse cx="22.5" cy="-1" rx="2" ry="3" fill="#ff6f00" opacity="0.8" />
        <ellipse cx="32" cy="1" rx="2" ry="3" fill="#ff6f00" opacity="0.8" />
        
        <circle cx="15" cy="20" r="1.5" fill="#ffd700" />
        <circle cx="30" cy="20" r="1.5" fill="#ffd700" />
        <circle cx="22.5" cy="30" r="1.5" fill="#ffffff" />
      </svg>

      <svg
        style={{
          position: 'absolute',
          left: '10%',
          top: '15%',
          width: `${30 * scale}px`,
          height: `${45 * scale}px`,
        }}
        viewBox="0 0 30 45"
      >
        <ellipse cx="10" cy="12" rx="8" ry="10" fill="#e91e63" />
        <path d="M10,22 Q8,27 10,32" stroke="#e91e63" strokeWidth="1" fill="none" />
        <polygon points="9,32 10,37 11,32" fill="#e91e63" />
        
        <ellipse cx="20" cy="8" rx="7" ry="9" fill="#42a5f5" />
        <path d="M20,17 Q18,22 20,27" stroke="#42a5f5" strokeWidth="1" fill="none" />
        <polygon points="19,27 20,32 21,27" fill="#42a5f5" />
      </svg>

      <svg
        style={{
          position: 'absolute',
          right: '12%',
          top: '20%',
          width: `${25 * scale}px`,
          height: `${38 * scale}px`,
        }}
        viewBox="0 0 25 38"
      >
        <ellipse cx="12" cy="10" rx="7" ry="9" fill="#ffd700" />
        <path d="M12,19 Q10,24 12,29" stroke="#ffd700" strokeWidth="1" fill="none" />
        <polygon points="11,29 12,34 13,29" fill="#ffd700" />
        
        <ellipse cx="18" cy="5" rx="6" ry="8" fill="#ba68c8" />
        <path d="M18,13 Q16,18 18,23" stroke="#ba68c8" strokeWidth="1" fill="none" />
      </svg>

      {[...Array(12)].map((_, i) => {
        const colors = ['#ff1744', '#ffd700', '#2196f3', '#9c27b0', '#00e676'];
        const shapes = ['circle', 'rect', 'triangle'];
        const shape = shapes[i % 3];
        const color = colors[i % 5];
        const left = 10 + (i * 7) % 80;
        const top = 10 + (i * 11) % 70;
        const size = 3 + (i % 3);
        
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
            viewBox="0 0 10 10"
          >
            {shape === 'circle' && <circle cx="5" cy="5" r="4" fill={color} />}
            {shape === 'rect' && <rect x="1" y="1" width="8" height="8" fill={color} transform="rotate(45 5 5)" />}
            {shape === 'triangle' && <polygon points="5,1 9,9 1,9" fill={color} />}
          </svg>
        );
      })}
    </div>
  );
};

export default function BirthdayEnvelope(props: EnvelopeBaseProps) {
  return <EnvelopeBase {...props} themeStyles={themeStyles} Decorations={BirthdayDecorations} />;
}
