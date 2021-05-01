import './PopUp.css';

function PopUp({setOpen}) {
    
    return(
        <div className="popup" id="popup">
            <div className="close-btn">
                <button className="title-x" onClick={() => setOpen(false)}>X</button>
                
            </div>
        
            <h1 className="title-text">Selecione a dificuldade</h1>
        
            <div className="column">
    
                <button className="text-option option">FACIL</button>
                <button className="text-option option">MEDIO</button>  
                <button className="text-option option">DIFICIL</button>  
            
            </div>
            
                  
            
            
        </div>
    )
}

export default PopUp;