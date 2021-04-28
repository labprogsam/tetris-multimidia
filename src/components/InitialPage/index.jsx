import './InitialPage.css';
import Lego from '../../Images/whh_tetrisone.png'
import {useState} from 'react';

function InitialPage({ setStartGame, setPlayer1, setPlayer2, player1, player2 }) {
  const [quantPlayers, setquantPlayers] = useState(1);
  const [oneChecked, setOneChecked] = useState(true);
  const [twoChecked, setTwoChecked] = useState(false);

  const changeQuantPlayers = () => {
    if(oneChecked === true) {
      setquantPlayers(2);
    } else {
      setquantPlayers(1);
    }
    setOneChecked(!oneChecked);
    setTwoChecked(!twoChecked);
  }

  return (
    <div className="container-initial-page">
      <div className="contents-initial-page">
        <h1>CINTETRIX</h1>
        <img className="lego" src={Lego} alt="Peça de lego"/>
        <form className="form" action="">
          <div className="inputs-initial-page">
            <div className="input">
              {quantPlayers === 1
                ? <label htmlFor="">Nome do jogador</label>
                : <label htmlFor="">Nome do jogador 1</label>
              }
              <input value={player1} onChange={(e) => setPlayer1(e.target.value)}/>
            </div>
            {quantPlayers === 2 && <div className="input">
              <label htmlFor="">Nome do jogador 2</label>
              <input value={player2} onChange={(e) => setPlayer2(e.target.value)}/>
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
          </div>
          <button onClick={() => setStartGame(true)} className="start-button">START</button>
        </form>
      </div>
    </div>
  );
}

export default InitialPage;
