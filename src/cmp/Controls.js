import React from 'react'
import Button from '@material-ui/core/Button'
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import './css/controls.css';

function Controls({on_click_erase,on_click_undo,on_click_hint}) {
    return (
        <div className="controls_container">
            <Button onClick={on_click_undo} className="button_container">
            <UndoIcon className="buttons" fontSize="large"/>
            <p>Undo</p>
            </Button>
            <Button onClick={on_click_erase} className="button_container">
            <DeleteIcon className="buttons"  fontSize="large"/>
            <p>Erase</p>
            </Button>



            <Button onClick={on_click_hint} className="button_container">
            <NotListedLocationIcon className="buttons" fontSize="large"/>
            <p>Hint</p>
            </Button>
            
        </div>
    )
}

export default Controls
