import { useMemo } from 'react'
import Mailbox from './components/Mailbox'
import lettersData from './letters.json'

interface LetterData {
  id: string;
  date: string;
  title: string;
  content: string;
}

function App() {
  const mails = useMemo(() => {
    const data = lettersData as LetterData[];
    return data.map(letter => ({
      id: letter.id,
      date: new Date(letter.date),
      title: letter.title,
      content: letter.content
    }));
  }, []);

  return <Mailbox mails={mails} />
}

export default App
