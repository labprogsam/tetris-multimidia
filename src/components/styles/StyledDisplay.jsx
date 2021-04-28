import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  justify-content: center;
  margin: 0 0 20px 0;
  padding: 15px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#DB00FF')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  text-align: center;
`;

export const StyledLabel = styled.p`
  color: #FFF;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  text-align: center;
`;