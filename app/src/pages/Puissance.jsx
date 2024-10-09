import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';  // Import Socket.io

const socket = io('http://localhost:3000'); // Connect to the Fastify backend

const ROWS = 6;
const COLUMNS = 7;
const EMPTY_CELL = null;

const Puissance = () => {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(EMPTY_CELL)));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isGameReady, setIsGameReady] = useState(false); // Tracks if the game can start
  const [isMyTurn, setIsMyTurn] = useState(false); // Track if it's the player's turn
  const user = JSON.parse(localStorage.getItem('user'));  // Get user from local storage
  const token = localStorage.getItem('token');  // Get token from local storage

  useEffect(() => {
    if (!user || !token) {
      alert("Please log in to start the game");
      window.location.href = '/signin';  // Redirect to login if necessary
    } else {
      // User is logged in, connect to the socket
      socket.emit('joinGame', { username: user.username });

      // Listen for game readiness
      socket.on('gameReady', (gameData) => {
        setIsGameReady(true);
        setIsMyTurn(gameData.firstPlayer === user.username);  // Determine if it's this player's turn
      });

      // Listen for opponent moves
      socket.on('opponentMove', ({ board, nextPlayer }) => {
        setBoard(board);
        setCurrentPlayer(nextPlayer);
        setIsMyTurn(true);  // Switch turn back to this player
      });

      // Listen for win event
      socket.on('gameWon', (winner) => {
        setWinner(winner);
      });
    }
  }, [user, token]);

  const dropDisc = (colIndex) => {
    if (!isMyTurn || winner) return; // Only allow move if it's the player's turn and there's no winner
    const rowIndex = board.map(row => row[colIndex]).lastIndexOf(EMPTY_CELL);
    if (rowIndex === -1) return;

    const newBoard = board.map(row => [...row]);
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    // Send the move to the server
    socket.emit('makeMove', { board: newBoard, nextPlayer: currentPlayer === 1 ? 2 : 1 });

    // Update the game state locally
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setIsMyTurn(false);  // End this player's turn
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(EMPTY_CELL)));
    setCurrentPlayer(1);
    setWinner(null);
    socket.emit('resetGame'); // Notify the server to reset the game
  };

  if (!isGameReady) {
    return <div>Waiting for another player...</div>;
  }

  return (
    <div className={`game-container ${isMyTurn ? 'your-turn' : 'opponent-turn'}`}>
      <h1>Puissance 4</h1>
      {winner ? (
        <h2>{winner === user.username ? 'You Win!' : 'You Lose!'}</h2>
      ) : (
        <h2>{isMyTurn ? 'Your Turn' : "Opponent's Turn"}</h2>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="col" onClick={() => dropDisc(colIndex)}>
                <div className={`cell ${cell === 1 ? 'red' : cell === 2 ? 'yellow' : ''}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
};

export default Puissance;
