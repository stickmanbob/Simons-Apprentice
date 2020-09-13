//////////////// Instructions ////////////////////////
//
// A simple list of instructions about the game
//

// Imports

import React from 'react';
import { Link } from 'react-router-dom';

//Main

export default function Instructions(){

    return(
        <section id='instructions'>
            <h1>Instructions</h1>

            <p>You are an aspiring magician, and are fortunate enough to have
                recently been accepted as an apprentice by Simon, one of the 
                greatest sorcerors alive today. In order to earn his favor, you 
                must rise through the ranks of his other apprentices by successfully
                casting spells. But beware, one wrong step and your spell will fizzle, 
                and Simon does not tolerate failure... 
            </p>

            <ul>
                <li>Each round, Simon will demonstrate a spell by summoning elementals 
                    in a particular order. Pay attention!
                </li>

                <li>
                    Once Simon is done, you must use the four orbs of power
                    on the bottom of the screen to summon the same 
                    elementals in the same order to complete the spell. 
                </li>

                <li>
                    Simply click on an orb to summon an elemental. The red orb summons
                    red elementals, the blue one summons blue elementals, and so on. 
                </li>

                <li>
                    Beware, if you summon the wrong elemental the spell will fizzle, and 
                    you will be banished!
                </li>

                <li>
                    The sequence of elementals stays the same from round to round, but 
                    gets longer each time. Cast as many spells as possible to place your name 
                    on the Honor Scroll!
                </li>
            </ul>

            <Link to="/">Back to Main Menu</Link>
        </section>
    )
}