import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  selected: {
    rotateY: 0,

    transition: { duration: 0.35 },
    zIndex: 10,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
  initial: {
    rotateY: -180,
    transition: { duration: 0.35 },
  },
};

const selectionReset = {
  id: '',
  cardNumber: '',
};

const createGameNumbers = () => {
  const getNumbers = () => {
    const results: number[] = [];

    while (results.length < 18) {
      const random = Math.floor(Math.random() * 18) + 1;
      if (results.indexOf(random) === -1) {
        results.push(random);
      }
    }
    return results;
  };

  const batchOne = getNumbers();
  const batchTwo = getNumbers();

  return [...batchOne, ...batchTwo].sort((a, b) => 0.5 - Math.random());
};

interface CardProps {
  id: string;
  cardNumber: string;
}

function App() {
  const cardRefs = useRef<any>([]);
  const [selectionOne, setSelectionOne] = useState<CardProps>({
    id: '',
    cardNumber: '',
  });
  const [selectionTwo, setSelectionTwo] = useState<CardProps>({
    id: '',
    cardNumber: '',
  });
  const [clickCount, setClickCount] = useState<number>(0);
  const [match, setMatch] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const gameMatch = useMemo(() => {
    return match;
  }, [match]);

  const gameNumbers = useMemo(() => {
    if (gameOver) {
      const batch = createGameNumbers();

      return batch;
    }

    const batch = createGameNumbers();

    return batch;
  }, [gameOver]);

  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const id = e.currentTarget?.getAttribute('data-card-id');
    const cardNumber = e.currentTarget?.getAttribute('data-card-number');
    setClickCount((prev) => prev + 1);

    const selection = {
      id: id ? id : '',
      cardNumber: cardNumber ? cardNumber : '',
    };

    if (clickCount === 0) {
      setSelectionOne(selection);
    }

    if (clickCount === 1) {
      setSelectionTwo(selection);
    }
  };

  useEffect(() => {
    if (selectionOne.cardNumber && selectionTwo.cardNumber) {
      if (selectionOne.cardNumber === selectionTwo.cardNumber) {
        const timer = setTimeout(() => {
          setMatch((prevState) => [
            ...(prevState as unknown as string),
            selectionOne.cardNumber,
          ]);
          setClickCount(0);
        }, 3000);
        return () => clearTimeout(timer);
      }

      if (selectionOne.cardNumber !== selectionTwo.cardNumber) {
        const timer = setTimeout(() => {
          setSelectionOne(selectionReset);
          setSelectionTwo(selectionReset);
          setClickCount(0);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [selectionOne, selectionTwo]);

  useEffect(() => {
    const gameState = gameNumbers.filter(
      (num) => !gameMatch.includes(num.toString())
    );

    if (gameState.length <= 0) {
      setGameOver(true);
    }
  }, [gameMatch, gameNumbers]);

  return (
    <div className="py-12">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="card-grid">
          {!gameOver &&
            gameNumbers.map((num: any, index: number) => {
              const cardId = `${num}-${index}`;
              const cardNumber = num.toString();
              let isMatched = false;

              let label = '';

              if (selectionOne.id === cardId) {
                label = cardNumber;
                isMatched = true;
              }

              if (selectionTwo.id === cardId) {
                label = cardNumber;
                isMatched = true;
              }

              if (gameMatch.includes(cardNumber)) {
                return <div />;
              }

              return (
                <motion.div
                  key={cardId}
                  data-card-id={cardId}
                  data-card-number={num}
                  className="rounded w-full text-3xl font-black text-center cursor-pointer flex flex-col justify-center items-center bg-white mb-4"
                  style={{ height: 150, width: 200 }}
                  onClick={(e) => handleClick(e)}
                  ref={(el) => cardRefs.current.push(el)}
                  variants={cardVariants}
                  animate={label === cardNumber ? 'selected' : ''}
                  custom={1}
                  initial={'initial'}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: label === cardNumber ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    {label}
                  </motion.span>
                </motion.div>
              );
            })}
        </div>
        <div className="w-full py-4 mx-auto text-center">
          {gameOver && (
            <button
              onClick={() => {
                setMatch([]);
                setGameOver(false);
                setClickCount(0);
                setSelectionOne(selectionReset);
                setSelectionTwo(selectionReset);
              }}
              className="px-4 py-2 text-white bg-green-400 w-1/5 rounded shadow focus:bg-green-300 focus:shadow-md"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
