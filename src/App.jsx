import React, { useEffect, useState } from 'react';
import Tetris from './components/Tetris';
import InitialPage from './components/InitialPage';
import { StyledTetrisWrapper } from './components/styles/StyledTetris';
import { checkCollision, createStage } from './gameHelpers';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [velocity, setVelocity] = useState(800);

  const [powersStatusPlayer1, setPowersStatusPlayer1] = useState({
    blockRotate: false,
    blockMove: false,
    speedIncrease: false,
    invisible: false,
  });

  const [powersStatusPlayer2, setPowersStatusPlayer2] = useState({
    blockRotate: false,
    blockMove: false,
    speedIncrease: false,
    invisible: false,
  });

  //Player1
  const [player1, updatePlayer1Pos, resetPlayer1, player1Rotate] = usePlayer(setPowersStatusPlayer2);
  const [stage1, setStage1] = useStage(player1, resetPlayer1);
  const [powersQuantPlayer1, setPowersQuantPlayer1] = useState({
    blockRotate: 2,
    blockMove: 2,
    speedIncrease: 2,
    invisible: 2,
  });
  const [nick1, setNick1] = useState('');
  const [dropTime1, setDropTime1] = useState(null);
  const [game1Over, setGame1Over] = useState(false);

  //Player2
  const [player2, updatePlayer2Pos, resetPlayer2, player2Rotate] = usePlayer(setPowersStatusPlayer1);
  const [stage2, setStage2] = useStage(player2, resetPlayer2);
  const [powersQuantPlayer2, setPowersQuantPlayer2] = useState({
    blockRotate: 2,
    blockMove: 2,
    speedIncrease: 2,
    invisible: 2,
  });
  const [nick2, setNick2] = useState('');
  const [dropTime2, setDropTime2] = useState(null);
  const [game2Over, setGame2Over] = useState(false);

  // ---------------------------------------------------

  useEffect(() => {
    if (startGame) {
    // Reset everything
    setStage1(createStage());
    setDropTime1(velocity);
    resetPlayer1();
    setGame1Over(false);

    // Reset everything
    setStage2(createStage());
    setDropTime2(velocity);
    resetPlayer2();
    setGame2Over(false);
    }
  }, [startGame, setStage2, setStage1, resetPlayer1, resetPlayer2]);

  const drop = (player, stage, updatePlayerPos, setGameOver, setDropTime) => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = (player, stage, updatePlayerPos, setGameOver, setDropTime) => {
    setDropTime(null);
    drop(player, stage, updatePlayerPos, setGameOver, setDropTime);
  };

  const movePlayer = (dir, player, stage, updatePlayerPos) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const powerBlockRotate = (powersQuant, setPowersQuant, powersStatus, setPowersStatus) => {
    if(powersQuant.blockRotate >= 1) {
      setPowersStatus({ ...powersStatus, blockRotate: true});
      setPowersQuant({ ...powersQuant, blockRotate: powersQuant.blockRotate - 1});
    }
  }

  const powerBlockMove = (powersStatus, setPowersStatus, powersQuant, setPowersQuant) => {
    if(powersQuant.blockMove >= 1) {
      setPowersStatus({ ...powersStatus, blockMove: true});
      setPowersQuant({ ...powersQuant, blockMove: powersQuant.blockMove - 1});
    }
  }

  const powerSpeedIncrease = (powersStatus, setPowersStatus, powersQuant, setPowersQuant) => {
    if(powersQuant.speedIncrease >= 1) {
      setPowersStatus({ ...powersStatus, speedIncrease: true});
      setPowersQuant({ ...powersQuant, speedIncrease: powersQuant.speedIncrease - 1});
    }
  }

  const move = ({ keyCode }) => {
      if (keyCode === 65 && !powersStatusPlayer2.blockMove) { //Tecla A
        movePlayer(-1, player1, stage1, updatePlayer1Pos);
      } else if (keyCode === 68 && !powersStatusPlayer2.blockMove) { //Tecla D
        movePlayer(1, player1, stage1, updatePlayer1Pos);
      } else if (keyCode === 83) { //Tecla S
        dropPlayer(player1, stage1, updatePlayer1Pos, setGame1Over, setDropTime1);
      } else if (keyCode === 87 && !powersStatusPlayer2.blockRotate) { //Tecla W
        player1Rotate(stage1, 1);
      } else if (keyCode === 71) { //Tecla G
        powerBlockRotate(powersQuantPlayer1, setPowersQuantPlayer1, powersStatusPlayer1, setPowersStatusPlayer1);
      } else if (keyCode === 72) { //Tecla H
        powerBlockMove(powersStatusPlayer1, setPowersStatusPlayer1, powersQuantPlayer1, setPowersQuantPlayer1);
      } else if (keyCode === 74) { //Tecla J
        powerSpeedIncrease(powersStatusPlayer1, setPowersStatusPlayer1, powersQuantPlayer1, setPowersQuantPlayer1);
      } else if (keyCode === 37 && !powersStatusPlayer1.blockMove) { //Tecla da seta para esquerda
        movePlayer(-1, player2, stage2, updatePlayer2Pos);
      } else if (keyCode === 39 && !powersStatusPlayer1.blockMove) { //Tecla da seta para direita
        movePlayer(1, player2, stage2, updatePlayer2Pos);
      } else if (keyCode === 40) { //Tecla da seta para baixo
        dropPlayer(player2, stage2, updatePlayer2Pos, setGame2Over, setDropTime2);
      } else if (keyCode === 38 && !powersStatusPlayer1.blockRotate) { //Tecla da seta para cima
        player2Rotate(stage2, 1);
      } else if (keyCode === 66) { //Tecla B
        powerBlockRotate(powersQuantPlayer2, setPowersQuantPlayer2, powersStatusPlayer2, setPowersStatusPlayer2);
      } else if (keyCode === 78) { //Tecla N
        powerBlockMove(powersStatusPlayer2, setPowersStatusPlayer2, powersQuantPlayer2, setPowersQuantPlayer2);
      } else if (keyCode === 77) { //Tecla M
        powerSpeedIncrease(powersStatusPlayer2, setPowersStatusPlayer2, powersQuantPlayer2, setPowersQuantPlayer2);
      }
  };

  const keyUp = ({ keyCode }) => {
    if (!game1Over) {
      if (keyCode === 40) {
        setDropTime1(velocity);
      }
    }
    if (!game2Over) {
      if (keyCode === 83) {
        setDropTime2(velocity);
      }
    }
  };

  return (
    <div className="App">
      {startGame ? (
        <StyledTetrisWrapper
          role="button"
          tabIndex="0"
          onKeyDown={e => move(e)}
          onKeyUp={keyUp}
        >
          {nick1 && <Tetris
            powersQuant={powersQuantPlayer1}
            powersStatusOpponent={powersStatusPlayer2}
            setPowersStatusOpponent={setPowersStatusPlayer2}
            userName={nick1}
            stage={stage1}
            dropTime={dropTime1}
            drop={() => drop(player1, stage1, updatePlayer1Pos, setGame1Over, setDropTime1)}
            gameOver={game1Over}
            currentPlayer={1} />}
          {nick2 && <Tetris
            powersQuant={powersQuantPlayer2}
            powersStatusOpponent={powersStatusPlayer1}
            setPowersStatusOpponent={setPowersStatusPlayer1}
            userName={nick2}
            stage={stage2}
            dropTime={dropTime2}
            drop={() => drop(player2, stage2, updatePlayer2Pos, setGame2Over, setDropTime2)}
            gameOver={game2Over}
            currentPlayer={2} />}
        </StyledTetrisWrapper>
      ) : (
        <InitialPage setStartGame={setStartGame}
          nick1={nick1}
          nick2={nick2}
          setNick1={setNick1}
          setNick2={setNick2}
          setVelocity={setVelocity}
        />
      )}
    </div>  
  );
};

export default App;