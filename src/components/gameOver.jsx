///////////////// Game Over ////////////////
// Displays the game over screen 
//
// Props:
// - rank (integer) : the final score of the player
// - reset (function) : a function to reset the game
//

//Imports

import React from 'react';

// Main

export default function GameOver({rank,reset}){

    return (
        <section id="game-over">

            <h1>You Fizzled the Spell!</h1>

            <h2>but you got to apprentice rank {rank}</h2>
            
            <button onClick={reset}>Try Again</button>

        </section>
    )
}
