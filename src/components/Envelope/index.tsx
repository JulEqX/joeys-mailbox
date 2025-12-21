import type { EnvelopeBaseProps } from './EnvelopeBase';
import ChristmasEnvelope from './ChristmasEnvelope';
import LoveEnvelope from './LoveEnvelope';
import BirthdayEnvelope from './BirthdayEnvelope';
import NewYearEnvelope from './NewYearEnvelope';
import DefaultEnvelope from './DefaultEnvelope';

export default function Envelope(props: EnvelopeBaseProps) {
  const theme = props.mail.theme || 'default';

  switch (theme) {
    case 'christmas':
      return <ChristmasEnvelope {...props} />;
    case 'love':
      return <LoveEnvelope {...props} />;
    case 'birthday':
      return <BirthdayEnvelope {...props} />;
    case 'newyear':
      return <NewYearEnvelope {...props} />;
    default:
      return <DefaultEnvelope {...props} />;
  }
}

export type { EnvelopeBaseProps };
