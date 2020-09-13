/////////////// High Score Screen ////////////////////
// 
// Renders the high score screen. Scores are stored in local storage
//
// Props:
//

// Imports
import React from "react";
import { Link } from "react-router-dom";

//Main

export default function HighScores(){
    
    let highScoreList = JSON.parse(localStorage.data).scores; 

    console.log(highScoreList); 
    return(
        <section id="high-scores">
            <h1>Honored Apprentices</h1>

            <div className="score-table">

                <div className="column">
                    <h2>Name</h2>
                    {highScoreList.map((player)=>{
                        return <h3>{player.name}</h3>
                    })}
                </div>

                <div className="column">
                    <h2>Rank</h2>
                    {highScoreList.map((player) => {
                        return <h3>{player.rank}</h3>
                    })}
                </div>

            </div>
            
            <Link to="/game" >Play Again!</Link>
            <Link to="/" >Main Menu</Link>
        </section>

    )
}