import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useQuery } from 'react-query';

interface ChartNumber {
  num: number;
  total: number;
}

function useGetNumbers() {
  const fetchRandomNumbs = async () => {
    const req = await fetch(
      'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const data = await req.text();
    return data;
  };

  return useQuery({
    queryKey: ['numbers'],
    queryFn: fetchRandomNumbs,
    enabled: true,
    staleTime: 1000000000000,
  });
}

function sortNumbers(numbers: string) {
  const parseNumbers = numbers?.split('\n');
  const organizedNumbers = parseNumbers.map((num, _, arr) => {
    const total = arr.filter((a) => a === num).length;
    return {
      num: parseInt(num),
      total,
    };
  });

  const results = organizedNumbers.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.total === value.total && t.num === value.num)
  );

  return results;
}

function yHeight(numbers: ChartNumber[]) {
  const findHighest = numbers.sort((a: any, b: any) =>
    a.total < b.total ? 1 : -1
  )[0];
  const highest = Math.floor(findHighest.total / 5) * 5;
  const yH = [];

  for (let i = 1; i < highest; i++) {
    const num = i * 5;

    if (num <= highest + 5) {
      yH.push(num);
    }
  }

  return yH;
}
function App() {
  const [enabled, setEnabled] = useState(false);
  const { data } = useGetNumbers();
  console.log('data', data);
  if (data) {
    const numbers = sortNumbers(data);
    const findYHeight = yHeight(numbers);

    return (
      <div className="py-12 mx-auto w-full max-w-5xl">
        <div className="flex flex-row justify-end h-max items-end">
          <div
            className="flex flex-col border-r-2"
            style={{ height: findYHeight.length * 80 }}
          >
            {findYHeight.reverse().map((y: number) => (
              <div
                key={y}
                className="flex flex-col items-center"
                style={{ height: 80 }}
              >
                <div
                  style={{
                    height: 1,
                    backgroundColor: 'white',
                    width: '100%',
                    position: 'relative',
                    left: 20,
                    top: 0,
                  }}
                />
                <span style={{ position: 'relative', top: -7, right: 6 }}>
                  {y}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{ height: 560 }}
            className="flex flex-row justify-between ml-16 w-full items-end"
          >
            {numbers.map((x: ChartNumber, index: number) => {
              const barClass = classNames('drop-shadow-2xl rounded-t-lg w-8', {
                'bg-gradient-to-t from-green-600 to-green-400': index === 0,
                'bg-gradient-to-t from-yellow-600 to-yellow-400': index === 1,
                'bg-gradient-to-t from-blue-600 to-blue-400': index === 2,
                'bg-gradient-to-t from-red-600 to-red-400': index === 3,
                'bg-gradient-to-t from-violet-600 to-violet-400': index === 4,
                'bg-gradient-to-t from-orange-600 to-orange-400': index === 5,
                'bg-gradient-to-t from-cyan-600 to-cyan-400': index === 6,
                'bg-gradient-to-t from-purple-600 to-purple-400': index === 7,
                'bg-gradient-to-t from-emerald-600 to-emerald-400': index === 8,
                'bg-gradient-to-t from-amber-600 to-amber-400': index === 9,
              });
              return (
                <React.Fragment key={x?.num}>
                  <motion.div
                    className={barClass}
                    initial={{ height: 0 }}
                    animate={{
                      height: (x?.total / 5) * 80,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-center pt-2"
                    >
                      {x?.total}
                    </motion.div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="border-t-2 w-full">
          <div
            className="flex flex-row justify-between"
            style={{ marginLeft: '5.4rem' }}
          >
            {numbers.map((x) => (
              <div key={x?.num} className="w-8 text-center">
                {x?.num}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default App;
