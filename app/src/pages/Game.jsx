import React, { useState, useEffect } from 'react';

const symbols = ['✌️', '👍', '👊', '🤟', '👌', '✋', '🤚', '👋', '🤙', '🖖'];

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [symbol, setSymbol] = useState('');
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
        setPosition({
          top: `${Math.floor(Math.random() * 90)}%`,
          left: `${Math.floor(Math.random() * 90)}%`,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const handleClick = () => {
    setScore(score + 1);
    setSymbol('');
  };

  const handleReset = () => {
    setScore(0);
    setTimeLeft(30);
    setSymbol('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Click the Symbols!</h1>
      <p className="mb-4">Score: {score}</p>
      <p className="mb-4">Time Left: {timeLeft}s</p>
      {timeLeft > 0 ? (
        <div
          className="absolute text-6xl cursor-pointer"
          style={{ top: position.top, left: position.left }}
          onClick={handleClick}
        >
          {symbol}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4">Time's up! Your final score is {score}.</p>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors duration-300"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
