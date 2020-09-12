import React from 'react'

function Gametype({on_game_selected,selected_option}) {


    
    return (
       
        
        <div className='form-group'>
            
            <select className="custom-select custom-select-s game_select" onChange={on_game_selected}>
                <option selected={selected_option==='e'?true:false} value="/easy">Easy</option>
                <option selected={selected_option==='m'?true:false} value="/medium">Medium</option>
                <option  selected={selected_option==='h'?true:false} value="/hard">Hard</option>
                <option  selected={selected_option==='ex'?true:false} value="/expert">Expert</option>
                
            </select>
              
            
        </div>
    )
}

export default Gametype
