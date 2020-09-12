import React from 'react'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import InfoIcon from '@material-ui/icons/Info'

function Timer({sec,min,setsec,setmin,timer_pause,settimer_pause,setbutton_status,button_status}) {
    
    
    const sec_changer=()=>{
        setTimeout(() => {
            setsec((sec+1)%60)
            if((sec+1)%60===0)
            {min_change();}
        }, 1000);
    }
    const min_change=()=>{
        setTimeout(() => {
            setmin((min+1)%60)
        }, 1);
    }

    const format_timer=(t)=>
    {
        let m=t.split(':')[0]
        let s=t.split(':')[1]
        if(m.length===1)
        {
            m='0'+m
        }
        if(s.length===1)
        {
            s='0'+s
        }
        return m+':'+s;

    }
    const timer_start=()=>{
        if(!timer_pause)
        {
        sec_changer();
        }
        
    }
    const togglepause=()=>{
    settimer_pause(!timer_pause)
    setbutton_status(!button_status)
    }
    return (
        <div>
        <div className="help tooltiphelp"><InfoIcon style={{color:'lightseagreen'}}/>
        <span className="tooltiptext">
            Undo - press Ctrl+Z<br/>
            Erase -press 0<br/>
            Hint - press Shift+H<br/>
        </span>
        </div>
        <div className="timer">
            {format_timer(`${min}:${sec}`)}
            {timer_pause?<PlayArrowIcon onClick={togglepause}/>:<PauseIcon onClick={togglepause}/>}

            {timer_pause?'':timer_start()}
            
        </div>
        </div>
    )
}

export default Timer
