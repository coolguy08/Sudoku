import React from 'react'
import './css/winner.css'

function Winner({time,path_to_newgame}) {
    return (
        <div className="winner_container">

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Winner!!</h5>
                    <p className="card-text">congratulations you have solved in <br/> {time.split(':')[0]==0?'': time.split(':')[0]+' min and  '}{time.split(':')[1]} sec</p>
                    <a href={path_to_newgame} className="btn btn-primary">New Game</a>

                </div>
                
            </div>
        </div>
    )
}

export default Winner
