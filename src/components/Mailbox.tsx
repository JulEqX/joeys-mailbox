import { useState, useMemo } from "react";
import Envelope from "./Envelope/index";
import type { Mail } from "../models/Mail";
import { motion, stagger } from "motion/react";

interface MailboxProps {
  mails: Mail[];
}

interface GroupedMails {
  [key: string]: Mail[];
}

type EnvelopeState = "small" | "enlarged" | "opened";

interface EnvelopeStateMap {
  [mailId: string]: EnvelopeState;
}

export default function Mailbox({ mails }: MailboxProps) {
  const [envelopeStates, setEnvelopeStates] = useState<EnvelopeStateMap>({});

  const groupedMails = useMemo(() => {
    const groups: GroupedMails = {};

    mails.forEach((mail) => {
      const monthYear = mail.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(mail);
    });

    Object.keys(groups).forEach((key) => {
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
    const currentState = envelopeStates[mailId] || "small";

    if (currentState === "small") {
      setEnvelopeStates({ [mailId]: "enlarged" });
    } else if (currentState === "enlarged") {
      setEnvelopeStates({ [mailId]: "opened" });
    }
  };

  const handleBackgroundClick = () => {
    setEnvelopeStates({});
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.25),
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      className="mailbox-container"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {sortedMonths.map((monthYear) => (
        <motion.div
          key={monthYear}
          style={{ marginBottom: "48px" }}
          variants={item}
        >
          <motion.h2
            variants={item}
            style={{
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 600,
              marginBottom: "24px",
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            {monthYear}
          </motion.h2>

          <div
            style={{
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {groupedMails[monthYear].map((mail) => {
              const state = envelopeStates[mail.id] || "small";

              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <Envelope
                    key={mail.id}
                    mail={mail}
                    state={state}
                    onEnvelopeClick={() => handleEnvelopeClick(mail.id)}
                    onBackgroundClick={handleBackgroundClick}
                    layoutId={`envelope-${mail.id}`}
                  />
                  {mail.title}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
