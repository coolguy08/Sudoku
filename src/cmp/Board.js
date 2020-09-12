import React, { useEffect } from 'react';
import './css/Board.css';


function Board(
    {
    //destructuring props
    onbutton_click,
    setposition,
    copysudoku,
    setbutton_status,
    move_cell,
    setmoveposition,
    timer_pause,
    on_click_undo,
    on_click_erase,
    on_click_hint

    }
                ) {
   
    const key_pressed=(e)=>{
        
        if((e.keyCode>=49 && e.keyCode<=57) || (e.keyCode>=97 && e.keyCode<=105))
        {//console.log(e.key);
            
        let val={"target":{"value":e.key}}
        //console.log(val);
        setbutton_status(true);
        onbutton_click(val);
        
        }
        else if(e.keyCode===38 || e.keyCode===39 || e.keyCode===37 || e.keyCode===40)
        {
            
            move_cell(e.keyCode);
        }
        else if(e.keyCode===90)
        {
            //undo call on ctrl+z
            on_click_undo();
        }
        else if(e.keyCode===96)
        {
            //erase call on press 0
            on_click_erase();
        }
        else if(e.keyCode===72)
        {
            //call hint on shift+h
            on_click_hint();
        }
       // console.log(e);


       
    }
    
    useEffect(() => {


        
        document.addEventListener('keydown',key_pressed,true);

        return ()=>
        { document.removeEventListener('keydown',key_pressed,true);}
    }, [onbutton_click,move_cell])

    
   
    

    
    
    const on_cell_selected=(e)=>
    {   
        if(timer_pause)
        {return}
           let t=document.getElementsByClassName('canchange');
           if(t.length!==0)
           {
            let name= t[0].className;
            name=name.replace('canchange','');
            t[0].className=name.trim()
           }
        

        let element=document.getElementById(e.target.id);
        element.className+=" canchange"
        
        
        
        setbutton_status(true);
        let i=parseInt(e.target.id.split(',')[0])
        let j=parseInt(e.target.id.split(',')[1])
        setposition([i,j])
        setmoveposition([i,j])
        

        
    }

    

    return (
        <div className="board_container">
            <table   className={timer_pause?'Board paused':'Board'}>
                <tbody>
            {
            copysudoku.map((items,i)=>
                  <tr key={i}>
                     {items.map((item,j)=>
                         typeof(item)==='string'?<td style={timer_pause?{color:'#e6e6e6',background:'#e6e6e6'}:{}} className="cannotchange twinkle_cell" key={`${i},${j}`} id={`${i},${j}`} >{parseInt(item)}</td>:
                     <td style={timer_pause?{color:'#e6e6e6',background:'#e6e6e6'}:{}} key={`${i},${j}`} id={`${i},${j}`} className="not_set" onClick={on_cell_selected}>{item===0?'':item}</td>
                         
                     )}
                  </tr>
            )
            }
            </tbody>
            </table>
        </div>
    )
}

export default Board
