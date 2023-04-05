import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const questions = [
  {
    id: uuidv4(),
    question: 'How many bones does a cat have?',
    answer: 'A cat has 230 bones - 6 more than a human',
  },
  {
    id: uuidv4(),
    question: 'How much do cats sleep?',
    answer: 'The average cat sleeps 12-16 hours per day',
  },
  {
    id: uuidv4(),
    question: 'How long do cats live',
    answer:
      'Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.',
  },
];

interface QuestionProps {
  id: string;
  question: string;
  answer: string;
}

function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelected = (id: string) => {
    if (id === selected) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };
  return (
    <div className="bg-gray-800 text-white m-0 p-0 w-full h-screen">
      <div className="mx-auto max-w-4xl py-12">
        {questions.map((q: QuestionProps) => (
          <div key={q?.id} className="h-24">
            <div
              className="w-full flex flex-row h-12 items-center cursor-pointer"
              onClick={() => handleSelected(q?.id)}
            >
              <div className="mr-6">
                {q?.id === selected ? (
                  <ChevronUpIcon className="h-6 w-6" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6" />
                )}
              </div>
              <p className="text-2xl">{q?.question}</p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                height: q?.id !== selected ? 0 : 10,
                opacity: q?.id !== selected ? 0 : 1,
              }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              className="mx-12"
            >
              {q?.answer}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
