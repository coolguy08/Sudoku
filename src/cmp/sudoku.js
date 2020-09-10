export function isvalid(su,num,pos)
{   //for row check
    //console.log(num,pos);
    for(let i=0;i<su.length;i++)
    {
        if(su[pos[0]][i]==num && i!=pos[1])
        {
            return false;
        } 
       
    
    }
    
    //for column check
    for(let i=0;i<su.length;i++)
    {
        if(su[i][pos[1]]==num && i!=pos[0]) 
        {return false;
        }
        
    }
    
    // for box checking
     let x=Math.floor(pos[0]/3);
    let y=Math.floor(pos[1]/3);
    for(let i=x*3;i<(x*3+3);i++)
    {
      for(let j=y*3;j<(y*3+3);j++)
        { if(su[i][j]==num && pos[0]!=i && pos[1]!=j)
            {return false;}
            

         }
    }
    
    return true;
        

}








export  function sudoku(game_diff){
    // const su=[
//     [0,1,0,0,4,0,0,5,0],
//     [0,0,0,0,9,0,0,0,0],
//     [0,0,9,6,0,8,7,0,0],
//     [7,0,3,0,6,0,8,0,1],
//     [0,0,0,7,0,3,0,0,0],
//     [6,0,8,0,0,0,4,0,7],
//     [0,0,0,1,0,9,0,0,0],
//     [0,9,2,0,0,0,3,7,0],
//     [0,0,5,2,3,4,1,0,0]
// ];

const d=game_diff;

//difficulty
let diff={
    'e':43,
    'm':51,
    'h':56,
    'ex':59
}
//easy = 38,
//medium=30
//hard=25
//Expert=22
let su=[
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
    
];


function isvalid(su,num,pos)
{   //for row check
    //console.log(num,pos);
    for(let i=0;i<su.length;i++)
    {
        if(su[pos[0]][i]===num && i!==pos[1])
        {
            return false;
        } 
       
    
    }
    
    //for column check
    for(let i=0;i<su.length;i++)
    {
        if(su[i][pos[1]]===num && i!==pos[0]) 
        {return false;
        }
        
    }
    
    // for box checking
     let x=Math.floor(pos[0]/3);
    let y=Math.floor(pos[1]/3);
    for(let i=x*3;i<(x*3+3);i++)
    {
      for(let j=y*3;j<(y*3+3);j++)
        { if(su[i][j]===num && pos[0]!==i && pos[1]!==j)
            {return false;}
            

         }
    }
    
    return true;
        

}

function get_possibilities(su,pos)
{ let l=[]
    for(let i=1;i<10;i++)
    {
        if(isvalid(su,i,pos))
        {
            l.push(i)
        }
    }
   
    
    
    return l.sort(()=> Math.random()-0.5);

}
function solve(su)
{   
   for(let i=0;i<su.length;i++)
   {
       for(let j=0;j<su.length;j++)
       {
            if(su[i][j]==0)
            {  
                let possible=get_possibilities(su,[i,j]);
                 
                for(let k=0;k<possible.length;k++)
                {   
                    
                      
                        //console.log(k);
                        su[i][j]=possible[k];
                        if(solve(su))
                        {return true;}

                        su[i][j]=0;
                        
                    

                }
                return false;
            }
       }
   }
return true;  

}

//random sudoku generated

solve(su)
let ans=[]
for(let i=0;i<9;i++)
{   let temp=[] 
     for(let j=0;j<9;j++)
        {
           temp.push(su[i][j]) 
        }
    ans.push(temp);
}


//console.log(123);
for(let i=0;i<diff[d];i++)
{
  let r1=Math.floor(Math.random()*9)
  let r2=Math.floor(Math.random()*9)
  //console.log(r);
  if(su[r1][r2]==0)
  {
      i--;
  }
  else
  { 
      su[r1][r2]=0;
      
  }
}

return [su,ans];


}
