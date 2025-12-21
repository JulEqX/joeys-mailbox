import EnvelopeBase from './EnvelopeBase';
import type { EnvelopeBaseProps, EnvelopeDecorationsProps, ThemeStyles } from './EnvelopeBase';
import christmasTreeSvg from '../../assets/christmas_tree.svg';
import snowFlakeSvg from '../../assets/snow_flake.svg';

const themeStyles: ThemeStyles = {
  background: 'linear-gradient(135deg, #c8e6c9 0%, #e53935 50%, #2e7d32 100%)',
  border: '#d32f2f',
  flapBackground: 'linear-gradient(180deg, #d32f2f 0%, #c62828 100%)',
  topOverlay: 'linear-gradient(180deg, rgba(211, 47, 47, 0.4) 0%, transparent 100%)',
  bottomOverlay: 'linear-gradient(0deg, rgba(46, 125, 50, 0.4) 0%, transparent 100%)',
  textColor: '#1b5e20',
  accentColor: '#c62828',
};

const ChristmasDecorations = ({ isExpanded }: EnvelopeDecorationsProps) => {
  const scale = isExpanded ? 2 : 1;
  
  return (
    <div style={{
      position: 'relative',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      <img
        src={christmasTreeSvg}
        alt="Christmas Tree"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: "translate(-50%, 50%)",
          width: `${30 * scale}px`,
          height: `${30 * scale}px`,
          zIndex: 10,
        }}
      />

      <img
        src={snowFlakeSvg}
        alt="Snow Flake 1"
        style={{
          position: 'absolute',
          left: '33%',
          top: '33%',
          transform: "translate(-50%, 50%)",
          width: `${10 * scale}px`,
          height: `${10 * scale}px`,
          zIndex: 10,
        }}
      />

      <img
        src={snowFlakeSvg}
        alt="Snow Flake 2"
        style={{
          position: 'absolute',
          left: '75%',
          top: '1%',
          transform: "translate(-50%, 50%)",
          width: `${10 * scale}px`,
          height: `${10 * scale}px`,
          zIndex: 10,
        }}
      />

      <img
        src={snowFlakeSvg}
        alt="Snow Flake"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: `${10 * scale}px`,
          height: `${10 * scale}px`,
          zIndex: 10,
        }}
      />

      <img
        src={snowFlakeSvg}
        alt="Snow Flake"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: `${10 * scale}px`,
          height: `${10 * scale}px`,
          zIndex: 10,
        }}
      />

      <img
        src={snowFlakeSvg}
        alt="Snow Flake"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: `${10 * scale}px`,
          height: `${10 * scale}px`,
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default function ChristmasEnvelope(props: EnvelopeBaseProps) {
  return <EnvelopeBase {...props} themeStyles={themeStyles} Decorations={ChristmasDecorations} />;
}
