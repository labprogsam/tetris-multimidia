import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-color: black;
  background-size: cover;
`;

export const StyledTetris = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
  padding: 40px;
  height: 100%;
  box-sizing: border-box;

  aside {
    width: 190px;
    display: block;
    padding-top: 80px;
  }
`;
