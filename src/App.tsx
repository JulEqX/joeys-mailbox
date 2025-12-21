import { useMemo, useState } from "react";
import Mailbox from "./components/Mailbox";
import lettersData from "./letters.json";
import type { EnvelopeTheme } from "./models/Mail";
import Letter from "./components/Letter";
import { AnimatePresence } from "motion/react";

interface LetterData {
  id: string;
  date: string;
  title: string;
  content: string;
  theme?: EnvelopeTheme;
}

function App() {
  const mails = useMemo(() => {
    const data = lettersData as LetterData[];
    return data.map((letter) => ({
      id: letter.id,
      date: new Date(letter.date),
      title: letter.title,
      content: letter.content,
      theme: letter.theme,
    }));
  }, []);

  const [isLetterVisible, setIsLetterVisible] = useState(false);

  return (
    <>
      <h1
        style={{
          color: "#ffffff",
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "40px",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        Joey's Mailbox
      </h1>
      <button onClick={() => setIsLetterVisible(!isLetterVisible)}>
        Toggle Letter
      </button>
      <AnimatePresence>
        {isLetterVisible && (
          <Letter
            mail={mails[0]}
            onClose={() => setIsLetterVisible(false)}
          ></Letter>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <Mailbox mails={mails} />
      </AnimatePresence>
    </>
  );
}

export default App;
