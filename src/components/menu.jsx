////////////// Main Menu ////////////////////////////
//
// Has links to instructions , high scores, and game
//

//Imports
  import React from "react";
  import { Link } from "react-router-dom";


export default function MainMenu(){


    return(
        <section id="main-menu">
            <h1>Welcome, Apprentice</h1>
            
            <Link to="/game">Play</Link>
            
            <Link to="/instructions">Instructions</Link>

            <Link to="/high-scores">High Scores</Link>
        </section>
    )
}