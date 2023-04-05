import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

interface DiceProps {
  id: string;
  faceNum: number;
}

const Dice = ({ dice }: { dice: DiceProps[] }) => {
  return (
    <>
      {dice.map((di: DiceProps) => {
        const diceClass = classNames(
          'bg-white w-48 h-44 block shadow-xl rounded mb-12 p-4 flex text-black flex flex-col justify-between mx-3'
        );

        return (
          <div className={diceClass}>
            {di?.faceNum === 1 && (
              <>
                <div></div>
                <div className="bg-black h-8 w-8 rounded-full mx-auto"></div>
                <div></div>
              </>
            )}
            {di?.faceNum === 2 && (
              <>
                <div className="bg-black h-8 w-8 rounded-full ml-auto"></div>
                <div></div>
                <div className="bg-black h-8 w-8 rounded-full mr-auto"></div>
              </>
            )}
            {di?.faceNum === 3 && (
              <>
                <div className="bg-black h-8 w-8 rounded-full ml-auto"></div>
                <div className="bg-black h-8 w-8 rounded-full mx-auto"></div>
                <div className="bg-black h-8 w-8 rounded-full mr-auto"></div>
              </>
            )}
            {di?.faceNum === 4 && (
              <>
                <div className="flex flex-row justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>
              </>
            )}
            {di?.faceNum === 5 && (
              <>
                <div className="flex flex-row justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>
                <div className="bg-black h-8 w-8 rounded-full mx-auto"></div>
                <div className="flex flex-row justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>
              </>
            )}
            {di?.faceNum === 6 && (
              <div className="flex flex-row justify-between h-44">
                <div className="flex flex-col justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>
                <div></div>
                <div className="flex flex-col justify-between">
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                  <div className="bg-black h-8 w-8 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

function App() {
  const [numDice, setNumDice] = useState<string>('');
  const [dice, setDice] = useState<DiceProps[] | null>(null);

  const handleRolled = () => {
    const numDiceToInt = parseInt(numDice);
    const results = [];

    for (let i = 1; i <= numDiceToInt; i++) {
      results.push({
        id: uuidv4(),
        faceNum: Math.floor(Math.random() * 6) + 1,
      });
    }

    setDice(results);
  };

  return (
    <div className="m-0 p-0">
      <div className="mx-auto max-w-4xl py-12">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumDice(e.target.value as string)
          }
          value={numDice}
          placeholder="Enter number of dice"
          className="bg-gray-800 border p-3 rounded w-full max-w-sm block mx-auto"
        />
        <button
          onClick={() => (numDice ? handleRolled() : null)}
          className={` ${
            numDice
              ? 'opacity-100 active:bg-blue-300 cursor-pointer'
              : 'opacity-50 cursor-auto	'
          } bg-blue-400 0 mt-4 p-3 rounded w-full max-w-sm block mx-auto`}
        >
          Roll
        </button>
        {dice && dice?.length > 0 && (
          <div className="w-full flex flex-row flex-wrap my-12 w-full max-w-2xl mx-auto flex-start">
            <Dice dice={dice} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
