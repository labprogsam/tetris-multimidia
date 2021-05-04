import React, { useState } from 'react';
import Tetris from './components/Tetris';
import InitialPage from './components/InitialPage';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [powersStatusPlayer1, setPowersStatusPlayer1] = useState({
    blockRotate: false,
    blockMove: false,
    speedIncrease: false,
    invisible: false,
  });
  const [powersQuantPlayer1, setPowersQuantPlayer1] = useState({
    blockRotate: 2,
    blockMove: 2,
    speedIncrease: 2,
    invisible: 2,
  });
  const [powersStatusPlayer2, setPowersStatusPlayer2] = useState({
    blockRotate: false,
    blockMove: false,
    speedIncrease: false,
    invisible: false,
  });
  const [powersQuantPlayer2, setPowersQuantPlayer2] = useState({
    blockRotate: 2,
    blockMove: 2,
    speedIncrease: 2,
    invisible: 2,
  });

  return (
    <div className="App">
      {startGame ? (
        <>
          {player1 && <Tetris
            powersStatus={powersStatusPlayer1}
            setPowersStatus={setPowersStatusPlayer1}
            powersQuant={powersQuantPlayer1}
            setPowersQuant={setPowersQuantPlayer1}
            powersStatusOpponent={powersStatusPlayer2}
            setPowersStatusOpponent={setPowersStatusPlayer2}
            userName={player1}
            currentPlayer={1} />}
          {player2 && <Tetris
            powersStatus={powersStatusPlayer2}
            setPowersStatus={setPowersStatusPlayer2}
            powersQuant={powersQuantPlayer2}
            setPowersQuant={setPowersQuantPlayer2}
            powersStatusOpponent={powersStatusPlayer1}
            setPowersStatusOpponent={setPowersStatusPlayer1}
            userName={player2}
            currentPlayer={2} />}
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