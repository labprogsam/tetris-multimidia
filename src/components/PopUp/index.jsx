import './PopUp.css';

function PopUp({ setOpen, setVelocity, setStartGame }) {
    return(
			<div className="popup" id="popup">
				<div className="close-btn">
					<button className="title-x" onClick={() => setOpen(false)}>X</button>
				</div>
				<h1 className="title-text">Selecione a dificuldade</h1>
				<div className="column">
					<button type="button" className="text-option option" onClick={() => { setVelocity(800); setOpen(false); setStartGame(true) }}>FACIL</button>
					<button type="button" className="text-option option" onClick={() => { setVelocity(500); setOpen(false); setStartGame(true) }}>MEDIO</button>  
					<button type="button" className="text-option option" onClick={() => { setVelocity(300); setOpen(false); setStartGame(true) }}>DIFICIL</button>  
				</div>
			</div>
    )
}

export default PopUp;