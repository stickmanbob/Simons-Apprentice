/////////////// High Score Screen ////////////////////
// 
// Renders the high score screen. Scores are stored in local storage
//
// Props:
//

// Imports
import React from "react";

//Main

export default function HighScores(){
    
    let highScoreList = JSON.parse(localStorage.data).scores; 

    console.log(highScoreList); 
    return(
        <section id="high-scores">
            <h1>High Scores</h1>

            {
                highScoreList.map((player) => {
                    return <div>
                        <h3>{player.name}</h3>
                        <h3>{player.rank}</h3>
                    </div>
                })
            }
        </section>

    )
}