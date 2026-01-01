import Title from "./Title";
import MailList from "./MailList";
import Letter from "./Letter";
import { AnimatePresence } from "motion/react";
import { useMailStore } from "../stores/mailStore";

export default function Mailbox() {
  const activeMail = useMailStore((state) => state.activeMail);
  const setActiveMail = useMailStore((state) => state.setActiveMail);

  return (
    <>
      <Title />
      <MailList />
      <AnimatePresence>
        {activeMail && (
          <Letter mail={activeMail} onClose={() => setActiveMail(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
