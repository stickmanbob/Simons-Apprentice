//////////// Inter Round Dialog Box ///////////////////
// 
// Pops up between rounds to give the player a break
//
// Props:
// - nextRound (function) : function to advance the game and begin the next round
// - rank (int) : player's current score

//Imports

import React from "react";

// Main

export default function InterRound({nextRound, rank}){

    return (
        <div>
            <h1>Good Job, Apprentice</h1>
            <h2>You are now rank {rank}</h2>

            <button onClick={nextRound}>Next Round</button>
        </div>
    )
}