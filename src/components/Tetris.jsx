import React from 'react';

import { createStage } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';
import './Tetris.css'

// Custom Hooks
import { useInterval } from '../hooks/useInterval';

// Components
import Stage from './Stage';
import Display from './Display';

//Images
import Speed from '../Images/powers/speed.png';
import Rotate from '../Images/powers/rotate.png';
import LeftRight from '../Images/powers/left-right.png';


function Tetris({ powersQuant, powersStatusOpponent, userName, currentPlayer, stage, drop, dropTime, gameOver }) {

  useInterval(() => {
    drop();
  }, !powersStatusOpponent.speedIncrease ? dropTime : dropTime/5);

  return (
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
      </aside>
        {/* <button onClick={}>Não girar</button>
        <button onClick={}>Bloquear movimento</button>
        <button onClick={}>Aumentar Velocidade</button> */}
    </StyledTetris>
  );
};

export default Tetris;
