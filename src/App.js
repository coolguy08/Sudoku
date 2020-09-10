import React ,{useState,useEffect}from 'react';
import './App.css';
import Gametype from './cmp/Gametype';
import Board from './cmp/Board';
import Buttons from './cmp/Buttons'
import Controls from './cmp/Controls'
import Timer from './cmp/Timer'
import Winner from './cmp/Winner'
import {sudoku,isvalid} from './cmp/sudoku';



function App() {
  const [su,setsudoku]=useState([]);
  const [suresult,setsuresult]=useState([[2]]);
  const [button_status, setbutton_status] = useState(false);
  const [copysudoku, setcopysudoku] = useState([[1]]);
  const [position, setposition] = useState(null);
  const [stack, setundostack] = useState([]);
  const [winner, setwinner] = useState(false)
  const [sec, setsec] = useState(0)
  const [min, setmin] = useState(0)
  const [moveposition, setmoveposition] = useState(null)
  const [timer_pause, settimer_pause] = useState(false)
  
  const diff={"easy":'e',"medium":"m","hard":"h","expert":"ex","":"e"}


  //for moving inside cells through keyboard
  const move_cell=(key)=>
  {
    
    if(button_status && moveposition!=null)
    {
      console.log(key);
      let x=moveposition[0];
      let y=moveposition[1];
      if(key===39) //right move
      { //change y

        y=(y+1)%9;
        
      }
      else if(key===37)  //left move
      {
        //change y
        let t=y-1===-1?8:(y-1)%9;
        y=t;
        

      }
      else if(key===38) //up move
      {
        //change x
        
        let t=x-1===-1?8:(x-1)%9;
        x=t
        
      }
      else if(key===40) //down move
      {
        //change x
        x=(x+1)%9;

      }

      // console.log('new location ');
      // console.log(x,y);

              let t=document.getElementsByClassName('canchange');
              if(t.length!==0)
              {
                let name= t[0].className;
                name=name.replace('canchange','');
                t[0].className=name.trim()
              }
          

          let element=document.getElementById(`${x},${y}`);
          element.className+=" canchange"
      if(copysudoku[x][y]==0)
      {
        setposition([x,y])
      }
      else
      {
        setposition(null);
      }
      setmoveposition([x,y]);
    }
  }
  //for changing color of all the invalid entries in board
  const verify_board=(pos)=>
  { if (pos==null)
    {return;}
    //row verification and color updation
    for(let i=0;i<9;i++)
    {
      
      if(!isvalid(copysudoku,copysudoku[pos[0]][i],[pos[0],i]) && i!=pos[1] && copysudoku[pos[0]][i]!=0)
      {
        let element=document.getElementById(`${pos[0]},${i}`);
        
        if(!element.className.includes("cannotchange"))
        {
          if(!element.className.includes('danger'))
           {element.className+=" danger";}
        }

      }
      else if(isvalid(copysudoku,copysudoku[pos[0]][i],[pos[0],i]) && i!=pos[1] && copysudoku[pos[0]][i]!=0)
      {
        let element=document.getElementById(`${pos[0]},${i}`);
        if(!element.className.includes("cannotchange"))
        {
          if(element.className.includes('danger'))
          {element.className="not_set"}
        }
        
      }
    }
    //for column verification and color updation
    for(let i=0;i<9;i++)
    {
      
      if(!isvalid(copysudoku,copysudoku[i][pos[1]],[i,pos[1]]) && i!=pos[0] && copysudoku[i][pos[1]]!=0)
      {
        let element=document.getElementById(`${i},${pos[1]}`);
        
        if(!element.className.includes("cannotchange"))
        {
          if(!element.className.includes('danger'))
           {element.className+=" danger";}
        }

      }
      else if(isvalid(copysudoku,copysudoku[i][pos[1]],[i,pos[1]]) && i!=pos[0] && copysudoku[i][pos[1]]!=0)
      {
        let element=document.getElementById(`${i},${pos[1]}`);
        if(!element.className.includes("cannotchange"))
        {
          if(element.className.includes('danger'))
          {element.className="not_set"}
        }
        
      }
    }
    //for box verification and color updation
    let x=Math.floor(pos[0]/3)
    let y=Math.floor(pos[1]/3)

    for(let i=x*3;i<(x*3+3);i++)
    {
      for(let j=y*3;j<(y*3+3);j++)
      {
        if(!isvalid(copysudoku,copysudoku[i],[j],[i,j]) && i!=pos[0] && j!=pos[1] && copysudoku[i][j]!=0)
        {
          let element=document.getElementById(`${i},${j}`);
          console.log(element);
          if(!element.className.includes("cannotchange"))
          {
            if(!element.className.includes('danger'))
             {element.className+=" danger";}
          }
        }
        else if(isvalid(copysudoku,copysudoku[i],[j],[i,j]) && i!=pos[0] && j!=pos[1] && copysudoku[i][j]!=0)
        {
          let element=document.getElementById(`${i},${j}`);
          if(!element.className.includes("cannotchange"))
          {
            if(element.className.includes('danger'))
            {element.className="not_set"}
          }
        }
      }
    }

  }
  //on clicking button to change sudoku value 
  const onbutton_click=(e)=>
  {  
    if(timer_pause)
      {
        settimer_pause(!timer_pause)
        setbutton_status(!button_status)
      }
   
    if(button_status && position!=null)
    { // console.log(e);
      let copy=deep_copy(copysudoku);
      copy[position[0]][position[1]]=parseInt(e.target.value);
      setcopysudoku(copy);
      let valid=isvalid(copysudoku,parseInt(e.target.value),position);
      let element=document.getElementById(`${position[0]},${position[1]}`);
      let temp=0
      if(!valid)
      {
        
        if(!element.className.includes('danger'))
        {
          temp=element.className+=" danger";
          
        
         }
         else
         {
           temp=element.className;
         }
        

      }
      else
      { 
        temp=element.className="canchange";
        


      }
     
      stack.push({"pos":position,"val":parseInt(e.target.value),"classname":temp})
      
      
      
    }
  }

    //for erasing the cell
    const on_click_erase=()=>
    {
      if(timer_pause)
      {
        settimer_pause(!timer_pause)
        setbutton_status(!button_status)
      }
      if(position!=null && copysudoku[position[0]][position[1]]!=0)
      { let copy=deep_copy(copysudoku);
        copy[position[0]][position[1]]=0;
        let element=document.getElementById(`${position[0]},${position[1]}`);
        if(element.className.includes('danger'))
        {element.className="canchange";}
        setcopysudoku(copy);

      }
    }

  //for hint button click
    const on_click_hint=()=>{
      if(timer_pause)
      {
        settimer_pause(!timer_pause)
        setbutton_status(!button_status)
      }
      if(position!=null && copysudoku[position[0]][position[1]]!=suresult[position[0]][position[1]])
      { let copy=deep_copy(copysudoku);
        copy[position[0]][position[1]]=suresult[position[0]][position[1]];
        stack.push({"pos":position,"val":suresult[position[0]][position[1]],"classname":"canchange"})
        setcopysudoku(copy);

      }

    }
  //for undo button click
    const on_click_undo=()=>{

      if(timer_pause)
      {
        settimer_pause(!timer_pause)
        setbutton_status(!button_status)
      }
      let last_opr=stack.pop();
      
      if(last_opr)
      {


        if(last_opr.pos[0]!=moveposition[0] || last_opr.pos[1]!=moveposition[1])
        {
          let element=document.getElementById(`${moveposition[0]},${moveposition[1]}`);
            
            let name=element.className;
            name=name.replace('canchange','');
            element.className=name.trim()
        }



      let copy=deep_copy(copysudoku);
      let last_last_opr=stack.pop();
        if(last_last_opr && last_opr.pos[0]==last_last_opr.pos[0] && last_opr.pos[1]==last_last_opr.pos[1])
        {
          copy[last_opr.pos[0]][last_opr.pos[1]]=last_last_opr.val;
          let element=document.getElementById(`${last_opr.pos[0]},${last_opr.pos[1]}`);
          element.className=last_last_opr.classname;
          console.log(last_last_opr.classname);
          stack.push(last_last_opr);
        }
        else
        {
          copy[last_opr.pos[0]][last_opr.pos[1]]=0;
          let element=document.getElementById(`${last_opr.pos[0]},${last_opr.pos[1]}`);
          
          let name=element.className;
          name=name.replace('canchange','');
          element.className=name.trim()

              if(last_last_opr)
              {
                setposition(last_last_opr.pos)
                let element=document.getElementById(`${last_last_opr.pos[0]},${last_last_opr.pos[1]}`);

                element.className+=" canchange"
                stack.push(last_last_opr);
                
              }
              else
              {
                setposition(null);
                setmoveposition(null)
              }


        }
      
      setcopysudoku(copy)
     
      }
      
      // console.log(stack);
      


    }
    
     //on game change selected option
      const on_game_selected=(e)=>
      {  
        //reload on gametype change
        window.location.pathname=e.target.value;
      }
      
       //for seprating filled and not filled sudoku values
      const deep_copy_seperate_datatypes=(l)=>{
        let r=[]
        for(let i=0;i<9;i++)
        {  let temp=[]
            for(let j=0;j<9;j++)
          {    
              l[i][j]!==0?temp.push(l[i][j]+''):temp.push(l[i][j]);
          }
          r.push(temp);
        }
         return r
      }

    //for copying the state value in other variable because of list of list type
    const deep_copy=(l)=>{
      let r=[]
      for(let i=0;i<9;i++)
      {  let temp=[]
          for(let j=0;j<9;j++)
        {    
            temp.push(l[i][j]);
        }
        r.push(temp);
      }
       return r
    }

//for generating code for game type
  
  const type=(name)=>
  { 
    
        let t=name.slice(1);
     
  if(diff[t])
  {
    return diff[t]; 

  }
  else
  {
    return 'e'
  }

  }
//for render on every new game
   useEffect(() => {
    let game_type=window.location.pathname;
    console.log(type(game_type));
    let temp=sudoku(type(game_type));
    
    setsudoku(temp[0])
    setcopysudoku(deep_copy_seperate_datatypes(temp[0]))
    setsuresult(temp[1])
    
   }, [])
  
  //for checking winner on change in copysudoku and verify sudoku again|| trigger for when sudoku is completed and win
   useEffect(() => {
    verify_board(position);
        let flag=true;
      for(let i=0;i<9;i++)
      {
        for(let j=0;j<9;j++)
        {
          if(copysudoku[i][j]!=suresult[i][j])
          { j=9;
            i=9;
          flag=false;
          }
        }
      }
      if(flag)
      {setwinner(true)}
   
    }, [copysudoku])

  return (
    
    <div className="Container">
     
     {
       

     winner?<Winner time={`${min}:${sec}`} path_to_newgame={window.location.pathname}/> :
     
     <div className="container_parent">
      <Gametype on_game_selected={on_game_selected} selected_option={type(window.location.pathname)}/>
       <Timer 
       sec={sec} 
       min={min} 
       setsec={setsec} 
       setmin={setmin}
       timer_pause={timer_pause}
       settimer_pause={settimer_pause}
       setbutton_status={setbutton_status}
       button_status={button_status}/>
       <Board
       onbutton_click={onbutton_click} 
       setposition={setposition}
       sudoku={su} 
       copysudoku={copysudoku} 
       setbutton_status={setbutton_status}
       move_cell={move_cell}
       setmoveposition={setmoveposition}
       timer_pause={timer_pause}
       />
      <Controls 
      on_click_erase={on_click_erase}
      on_click_undo={on_click_undo}
      on_click_hint={on_click_hint}
      />
     <Buttons onbutton_click={onbutton_click}/>
     </div>
     }
      
    </div>
  );
}

export default App;
