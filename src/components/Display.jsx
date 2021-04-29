import React from 'react';
import { StyledDisplay, StyledLabel } from './styles/StyledDisplay';

function Display({ gameOver, text }) {
  return (
    <div>
      <StyledLabel>{text}</StyledLabel>
      <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
    </div>
  );
}

export default Display;
