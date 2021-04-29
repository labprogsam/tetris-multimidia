import React from 'react';
import { StyledStage, StyledText, StageContainer } from './styles/StyledStage';

import Cell from './Cell';

function Stage ({ stage, userName }) {
  return (
    <StageContainer>
      <StyledText>{userName}</StyledText>
      <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
      </StyledStage>
    </StageContainer>
  );
};

export default Stage;
