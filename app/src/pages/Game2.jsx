import React, { useState, useEffect } from 'react';

const Game2 = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [apple, setApple] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);

        if (head.x === apple.x && head.y === apple.y) {
          setApple({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        if (
          head.x < 0 ||
          head.x >= 20 ||
          head.y < 0 ||
          head.y >= 20 ||
          newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, apple, gameOver, gameStarted]);

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setApple({ x: 15, y: 15 });
    setDirection('RIGHT');
    setGameOver(false);
    setGameStarted(false);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
      {!gameStarted ? (
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors duration-300"
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="relative w-80 h-80 bg-gray-800">
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-green-500"
                style={{
                  width: '20px',
                  height: '20px',
                  left: `${segment.x * 20}px`,
                  top: `${segment.y * 20}px`,
                }}
              ></div>
            ))}
            <div
              className="absolute bg-red-500"
              style={{
                width: '20px',
                height: '20px',
                left: `${apple.x * 20}px`,
                top: `${apple.y * 20}px`,
              }}
            ></div>
          </div>
          {gameOver && (
            <div className="mt-4">
              <p className="text-2xl mb-4">Game Over!</p>
              <button
                onClick={handleRestart}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors duration-300"
              >
                Restart
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game2;
