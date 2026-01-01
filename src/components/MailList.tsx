import { useMemo } from "react";
import { hidden, shown } from "../models/Mail";
import { motion, stagger } from "motion/react";
import { useMailStore } from "../stores/mailStore";
import EnvelopeBase from "./Envelope/EnvelopeBase";

export default function MailList() {
  const getMailsByMonthYear = useMailStore(
    (state) => state.getMailsByMonthYear
  );
  const setActiveMail = useMailStore((state) => state.setActiveMail);
  const groupedMails = useMemo(
    () => getMailsByMonthYear(),
    [getMailsByMonthYear]
  );

  const sortedMonths = useMemo(() => {
    return Object.keys(groupedMails).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });
  }, [groupedMails]);

  const mailListContainerVariant = {
    hidden: { ...hidden },
    shown: {
      ...shown,
      transition: {
        delayChildren: stagger(0.25),
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    shown: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="mail-list-container"
        variants={mailListContainerVariant}
        initial="hidden"
        animate="shown"
      >
        {sortedMonths.map((monthYear) => (
          <motion.div
            key={monthYear}
            className="mail-month-section"
            variants={item}
          >
            <motion.h2 className="mail-month-heading" variants={item}>
              {monthYear}
            </motion.h2>

            <div className="mail-grid">
              {groupedMails[monthYear].map((mail) => (
                <>
                  <div
                    key={mail.id}
                    className="mail-item"
                    onClick={() => setActiveMail(mail)}
                  >
                    <div className="mail-item-envelope">
                      <EnvelopeBase />
                    </div>
                    <div className="mail-item-info">
                      <div className="mail-item-title">{mail.title}</div>
                      <div className="mail-item-date">
                        {mail.date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
