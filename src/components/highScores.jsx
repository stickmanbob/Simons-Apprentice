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

            <div className="table-heading"><h2>Position</h2><h2>Name</h2> <h2>Rank</h2></div>
            {
                highScoreList.map((player, idx) => {
                    
                    return <div className="score" key={idx}>
                        <h3>{idx+1}</h3> <h3>{player.name}</h3> <h3>{player.rank}</h3>
                    </div>
                })
            }

            <Link to="/game" className="no-text-outline">Play Again!</Link>
            <Link to="/" className="no-text-outline">Main Menu</Link>
        </section>

    )
}