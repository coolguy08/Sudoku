import React from 'react'
import './css/buttons.css'
function Buttons({onbutton_click}) {
    return (
        <div className="buttons_container">
            
            <button value="1" onClick={onbutton_click}>1</button>
            <button value="2" onClick={onbutton_click}>2</button>
            <button value="3" onClick={onbutton_click}>3</button>
            <button value="4" onClick={onbutton_click}>4</button>
            <button value="5" onClick={onbutton_click}>5</button>
            <button value="6" onClick={onbutton_click}>6</button>
            <button value="7" onClick={onbutton_click}>7</button>
            <button value="8" onClick={onbutton_click}>8</button>
            <button value="9" onClick={onbutton_click}>9</button>
            
        </div>
    )
}

export default Buttons
