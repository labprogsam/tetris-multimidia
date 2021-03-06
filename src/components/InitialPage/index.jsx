import './InitialPage.css';
import Lego from '../../Images/whh_tetrisone.png'
import {useState} from 'react';
import PopUp from '../PopUp';

function InitialPage({ setStartGame, setNick1, setNick2, nick1, nick2, setVelocity }) {
  const [quantPlayers, setquantPlayers] = useState(1);
  const [oneChecked, setOneChecked] = useState(true);
  const [twoChecked, setTwoChecked] = useState(false);

  const [buttonPopUp, setButtonPopUp] = useState(false);

  const changeQuantPlayers = () => {
    if(oneChecked === true) {
      setquantPlayers(2);
    } else {
      setquantPlayers(1);
    }
    setOneChecked(!oneChecked);
    setTwoChecked(!twoChecked);
  }

  const startButton = (e) =>{
    e.preventDefault();
    
    if (quantPlayers === 1){
      setButtonPopUp(true);
    } else {
      setStartGame(true);
    }
  }

  return (
    <div className="container-initial-page">
      
      {/* Adicionando as estrelinhas */}
      <div className="stars"></div>
      <div className="stars2"></div>
      {/* Fim das estrelinhas */}
      
      <div className="contents-initial-page">
        <h1>CINTETRIX</h1>
        <img className="lego" src={Lego} alt="Peça de lego"/>
        <form className="form" onSubmit={(e) => startButton(e)}>
          <div className="inputs-initial-page">
            <div className="stars"></div>
            <div className="stars2"></div>

            <div className="input">
              {quantPlayers === 1
                ? <label htmlFor="player1">Nome do jogador</label>
                : <label htmlFor="player1">Nome do jogador 1</label>
              }
              <input required id="player1" value={nick1} onChange={(e) => setNick1(e.target.value)}/>
            </div>
            {quantPlayers === 2 && <div className="input">
              <label htmlFor="player2">Nome do jogador 2</label>
              <input required id="player2" value={nick2} onChange={(e) => setNick2(e.target.value)}/>
            </div>}
          </div>
          <div className="quant-players">
            <h2>Selecione um modo</h2>
            <div className="mod-select">
              <div className="mod">
                <input type="radio" checked={oneChecked} onChange={changeQuantPlayers}/>
                <label htmlFor="">1 jogador</label>
              </div>
              <div className="mod">
                <input type="radio" checked={twoChecked} onChange={changeQuantPlayers} />
                <label htmlFor="">2 jogadores</label>
              </div>
            </div>
          
          {/* Adicionando as estrelinhas */}
          <div className="stars"></div>
          <div className="stars2"></div>
          {/* Fim das estrelinhas */}
          </div>
          <button type="submit" className="start-button">START</button>
          {buttonPopUp && <PopUp setOpen={setButtonPopUp} setVelocity={setVelocity} setStartGame={setStartGame} />}
        </form>
      </div>
    </div>
  );
}

export default InitialPage;
