import React, { useState } from 'react';
import Tetris from './components/Tetris';
import InitialPage from './components/InitialPage';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  return (
    <div className="App">
      {startGame ? (
        <>
          {player1 && <Tetris userName={player1} />}
          {player2 && <Tetris userName={player2} />}
        </>
      ) : (
        <InitialPage setStartGame={setStartGame}
          player1={player1}
          player2={player2}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
        />
      )}
    </div>  
  );
};

export default App;