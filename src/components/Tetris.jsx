import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import './Tetris.css'

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

//Images
import Speed from '../Images/powers/speed.png';
import Rotate from '../Images/powers/rotate.png';
import LeftRight from '../Images/powers/left-right.png';


function Tetris({ powersStatus, setPowersStatus, powersQuant, setPowersQuant, powersStatusOpponent, setPowersStatusOpponent, userName, currentPlayer}) {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(setPowersStatusOpponent);
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on")
        setDropTime(1000);
      }
    }
  };

  const dropPlayer = () => {
    console.log("interval off")
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    console.log(keyCode);
    if (!gameOver && currentPlayer === 1) {
      if (keyCode === 65 && !powersStatusOpponent.blockMove) { //Tecla A
        movePlayer(-1);
      } else if (keyCode === 68 && !powersStatusOpponent.blockMove) { //Tecla D
        movePlayer(1);
      } else if (keyCode === 83) { //Tecla S
        dropPlayer();
      } else if (keyCode === 87 && !powersStatusOpponent.blockRotate) { //Tecla W
        playerRotate(stage, 1);
      } else if (keyCode === 71) { //Tecla G
        powerBlockRotate();
      } else if (keyCode === 72) { //Tecla H
        powerBlockMove();
      } else if (keyCode === 74) { //Tecla J
        powerSpeedIncrease();
      }
    } else if (!gameOver && currentPlayer === 2) {
      if (keyCode === 37 && !powersStatusOpponent.blockMove) { //Tecla da seta para esquerda
        movePlayer(-1);
      } else if (keyCode === 39 && !powersStatusOpponent.blockMove) { //Tecla da seta para direita
        movePlayer(1);
      } else if (keyCode === 40) { //Tecla da seta para baixo
        dropPlayer();
      } else if (keyCode === 38 && !powersStatusOpponent.blockRotate) { //Tecla da seta para cima
        playerRotate(stage, 1);
      } else if (keyCode === 66) { //Tecla B
        powerBlockRotate();
      } else if (keyCode === 78) { //Tecla N
        powerBlockMove();
      } else if (keyCode === 77) { //Tecla M
        powerSpeedIncrease();
      }
    }
  };

  const powerBlockRotate = () => {
    if(powersQuant.blockRotate >= 1) {
      setPowersStatus({ ...powersStatus, blockRotate: true});
      setPowersQuant({ ...powersQuant, blockRotate: powersQuant.blockRotate - 1});
    }
  }

  const powerBlockMove = () => {
    if(powersQuant.blockMove >= 1) {
      setPowersStatus({ ...powersStatus, blockMove: true});
      setPowersQuant({ ...powersQuant, blockMove: powersQuant.blockMove - 1});
    }
  }

  const powerSpeedIncrease = () => {
    if(powersQuant.speedIncrease >= 1) {
      setPowersStatus({ ...powersStatus, speedIncrease: true});
      setPowersQuant({ ...powersQuant, speedIncrease: powersQuant.speedIncrease - 1});
    }
  }

  useInterval(() => {
    drop();
  }, !powersStatusOpponent.speedIncrease ? dropTime : dropTime/5);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} userName={userName} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Pontuacao" />
              <Display text="Linhas" />
              <Display text="Velocidade" />
              <div className="container-powers">
                <h2>Seus poderes</h2>
                <div className="powers-multplayer">
                  <div className="power-block-rotate power">
                    <p className="quant-power">{powersQuant.blockRotate}</p>
                    <div className="image-power">
                      <img className="image-power" src={Rotate} alt=""/>
                    </div>
                    <p className="power-key">{currentPlayer === 1 ? "G" : "B"}</p>
                  </div>
                  <div className="power-block-move power">
                    <p className="quant-power">{powersQuant.blockMove}</p>
                    <div className="image-power">
                      <img src={LeftRight} alt=""/>
                    </div>
                    <p className="power-key">{currentPlayer === 1 ? "H" : "N"}</p>
                  </div>
                  <div className="power-speed-increase power">
                    <p className="quant-power">{powersQuant.speedIncrease}</p>
                    <div className="image-power">
                      <img className="image-power" src={Speed} alt=""/>
                    </div>
                    <p className="power-key">{currentPlayer === 1 ? "J" : "M"}</p>
                  </div>
                </div>
                <div className="powers-single-player">
                </div>
              </div>
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
          {/* <button onClick={}>Não girar</button>
          <button onClick={}>Bloquear movimento</button>
          <button onClick={}>Aumentar Velocidade</button> */}
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
