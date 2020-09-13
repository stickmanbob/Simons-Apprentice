///////////////////// Elemental ////////////////////////////
//
// A wrapper component that takes in an image URL for an elemental sprite 
// and returns a pre-setup Spritesheet component
//
// Props:
// - imageUrl(string) : the asset path for the sprite sheet
// 


// Imports
    import React from 'react';
    import Spritesheet from 'react-responsive-spritesheet';

// Main

export default function Elemental({imageUrl}){

    return(
        <Spritesheet className='elemental'
            image={imageUrl} 
            widthFrame={400}
            heightFrame={160}
            steps={13}
            fps={13}
        />
    )
}