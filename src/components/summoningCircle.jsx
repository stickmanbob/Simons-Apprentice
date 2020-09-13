/////////////////// Summoning Circle /////////////////////////////
//
// Renders the summoning circle in the middle of the game screen
//
// Props:
// - contents(react HTML entity) : what will be rendered in the circle
//

//Imports
import React from 'react';

//Main
export default function SummoningCircle({contents}){
    
    return(

        <div className="summoning-circle">
            {contents}
        </div>
    )
}