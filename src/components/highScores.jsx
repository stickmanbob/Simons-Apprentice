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

            {
                highScoreList.map((player, idx) => {
                    return <div key={idx}>
                        <h3>{player.name}</h3>
                        <h3>{player.rank}</h3>
                    </div>
                })
            }

            <Link to="/game">Play Again!</Link>
        </section>

    )
}