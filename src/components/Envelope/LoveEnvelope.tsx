import EnvelopeBase from './EnvelopeBase';
import type { EnvelopeBaseProps, EnvelopeDecorationsProps, ThemeStyles } from './EnvelopeBase';

const themeStyles: ThemeStyles = {
  background: 'linear-gradient(135deg, #ffccd5 0%, #ff6b9d 100%)',
  border: '#e91e63',
  flapBackground: 'linear-gradient(180deg, #e91e63 0%, #ff6b9d 100%)',
  topOverlay: 'linear-gradient(180deg, rgba(233, 30, 99, 0.3) 0%, transparent 100%)',
  bottomOverlay: 'linear-gradient(0deg, rgba(233, 30, 99, 0.3) 0%, transparent 100%)',
  textColor: '#880e4f',
  accentColor: '#c2185b',
};

const LoveDecorations = ({ isExpanded }: EnvelopeDecorationsProps) => {
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
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${60 * scale}px`,
          height: `${55 * scale}px`,
          opacity: 0.15,
        }}
        viewBox="0 0 60 55"
      >
        <path
          d="M30,50 C30,50 5,35 5,20 C5,12 10,7 16,7 C22,7 28,12 30,17 C32,12 38,7 44,7 C50,7 55,12 55,20 C55,35 30,50 30,50 Z"
          fill="#e91e63"
        />
      </svg>

      <svg
        style={{
          position: 'absolute',
          left: '15%',
          top: '20%',
          width: `${20 * scale}px`,
          height: `${18 * scale}px`,
        }}
        viewBox="0 0 20 18"
      >
        <path
          d="M10,16 C10,16 2,11 2,6 C2,3 4,1 6,1 C8,1 9.5,3 10,4.5 C10.5,3 12,1 14,1 C16,1 18,3 18,6 C18,11 10,16 10,16 Z"
          fill="#c2185b"
        />
      </svg>

      <svg
        style={{
          position: 'absolute',
          right: '15%',
          top: '30%',
          width: `${18 * scale}px`,
          height: `${16 * scale}px`,
        }}
        viewBox="0 0 18 16"
      >
        <path
          d="M9,14 C9,14 2,10 2,5.5 C2,3 4,1 6,1 C7.5,1 8.5,2.5 9,3.5 C9.5,2.5 10.5,1 12,1 C14,1 16,3 16,5.5 C16,10 9,14 9,14 Z"
          fill="#f06292"
        />
      </svg>

      <svg
        style={{
          position: 'absolute',
          left: '70%',
          bottom: '25%',
          width: `${16 * scale}px`,
          height: `${14 * scale}px`,
        }}
        viewBox="0 0 16 14"
      >
        <path
          d="M8,12 C8,12 2,9 2,5 C2,3 3.5,1.5 5,1.5 C6.5,1.5 7.5,3 8,4 C8.5,3 9.5,1.5 11,1.5 C12.5,1.5 14,3 14,5 C14,9 8,12 8,12 Z"
          fill="#e91e63"
        />
      </svg>

      <svg
        style={{
          position: 'absolute',
          right: '20%',
          bottom: '35%',
          width: `${40 * scale}px`,
          height: `${12 * scale}px`,
          transform: 'rotate(-15deg)',
        }}
        viewBox="0 0 40 12"
      >
        <line x1="0" y1="6" x2="35" y2="6" stroke="#880e4f" strokeWidth="2" />
        <polygon points="35,6 40,3 40,9" fill="#880e4f" />
        <path d="M0,6 L3,3 L3,9 Z" fill="#e91e63" />
      </svg>

      <svg
        style={{
          position: 'absolute',
          left: '25%',
          bottom: '15%',
          width: `${25 * scale}px`,
          height: `${30 * scale}px`,
        }}
        viewBox="0 0 25 30"
      >
        <line x1="12.5" y1="15" x2="12.5" y2="28" stroke="#2e7d32" strokeWidth="2" />
        <ellipse cx="8" cy="18" rx="3" ry="1.5" fill="#2e7d32" />
        <ellipse cx="17" cy="20" rx="3" ry="1.5" fill="#2e7d32" />
        <circle cx="12.5" cy="10" r="5" fill="#c2185b" />
        <circle cx="12.5" cy="10" r="3.5" fill="#e91e63" />
        <circle cx="12.5" cy="10" r="2" fill="#f06292" />
      </svg>
    </div>
  );
};

export default function LoveEnvelope(props: EnvelopeBaseProps) {
  return <EnvelopeBase {...props} themeStyles={themeStyles} Decorations={LoveDecorations} />;
}
