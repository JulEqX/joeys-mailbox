import EnvelopeBase from './EnvelopeBase';
import type { EnvelopeBaseProps, ThemeStyles } from './EnvelopeBase';

const themeStyles: ThemeStyles = {
  background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 100%)',
  border: '#c19a6b',
  flapBackground: 'linear-gradient(180deg, #c19a6b 0%, #d4a574 100%)',
  topOverlay: 'linear-gradient(180deg, rgba(193, 154, 107, 0.3) 0%, transparent 100%)',
  bottomOverlay: 'linear-gradient(0deg, rgba(193, 154, 107, 0.3) 0%, transparent 100%)',
  textColor: '#5a3e2b',
  accentColor: '#8b6f47',
};

export default function DefaultEnvelope(props: EnvelopeBaseProps) {
  return <EnvelopeBase {...props} themeStyles={themeStyles} />;
}
