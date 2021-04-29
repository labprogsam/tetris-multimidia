import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-color: black;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
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
