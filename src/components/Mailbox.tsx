import { useState, useMemo } from 'react';
import Envelope from './Envelope';
import type { Mail } from '../models/Mail';

interface MailboxProps {
  mails: Mail[];
}

interface GroupedMails {
  [key: string]: Mail[];
}

type EnvelopeState = 'small' | 'enlarged' | 'opened';

interface EnvelopeStateMap {
  [mailId: string]: EnvelopeState;
}

export default function Mailbox({ mails }: MailboxProps) {
  const [envelopeStates, setEnvelopeStates] = useState<EnvelopeStateMap>({});

  const groupedMails = useMemo(() => {
    const groups: GroupedMails = {};
    
    mails.forEach((mail) => {
      const monthYear = mail.date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(mail);
    });

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    return groups;
  }, [mails]);

  const sortedMonths = useMemo(() => {
    return Object.keys(groupedMails).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });
  }, [groupedMails]);

  const handleEnvelopeClick = (mailId: string) => {
    const currentState = envelopeStates[mailId] || 'small';
    
    if (currentState === 'small') {
      setEnvelopeStates({ [mailId]: 'enlarged' });
    } else if (currentState === 'enlarged') {
      setEnvelopeStates({ [mailId]: 'opened' });
    }
  };

  const handleBackgroundClick = () => {
    setEnvelopeStates({});
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '48px',
          fontWeight: 700,
          marginBottom: '40px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}>
          Joey's Mailbox
        </h1>

        {sortedMonths.map((monthYear) => (
          <div key={monthYear} style={{ marginBottom: '48px' }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '24px',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}>
              {monthYear}
            </h2>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
            }}>
              {groupedMails[monthYear].map((mail) => {
                const state = envelopeStates[mail.id] || 'small';
                
                return (
                  <Envelope
                    key={mail.id}
                    mail={mail}
                    state={state}
                    onEnvelopeClick={() => handleEnvelopeClick(mail.id)}
                    onBackgroundClick={handleBackgroundClick}
                    layoutId={`envelope-${mail.id}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
