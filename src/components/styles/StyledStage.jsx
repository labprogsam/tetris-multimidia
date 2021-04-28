import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100vw;
  max-width: 25vw;
  background: #111;
`;

export const StyledText = styled.p`
  color: #FFF;
  font-size: 1.8rem;
`;

export const StageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: max-content;
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;