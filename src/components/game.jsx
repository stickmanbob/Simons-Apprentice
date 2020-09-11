///////////// Game /////////////////
//
// Renders the game itself and handles game logic
// 
// Props:


// Imports

import React from 'react';


//Main

const COLORS = ["red", "blue", "yellow", "green"]; 

export default class Game extends React.Component{

    constructor(props){
        super(props);

        //Set inital game state
        this.state = {
            currentSprite: null,
            loaded:false,
            sequence: ["red","blue"]
        }

        

        // Function Bindings
        this.handleClick = this.handleClick.bind(this); 
        this.fetchSprites = this.fetchSprites.bind(this); 
        this.playSequence = this.playSequence.bind(this); 
    }

    componentDidMount(){
        this.fetchSprites();
        this.setState({loaded: true})
    }

    fetchSprites(){

        // Fetch the sprites

        this.sprites = {
            red: <img src={require("../assets/redSprite.gif")} alt="red" />,
            yellow: <img src={require("../assets/yellowSprite.gif")} alt="yellow" />,
            green: <img src={require("../assets/greenSprite.gif")} alt="green" />,
            blue: <img src={require("../assets/blueSprite.gif")} alt="blue" />
        }
    
    }

    updateSequence(){
        
        // Create a copy of the old sequence to avoid mutating state
        let newSequence = Array.from(this.state.sequence);

        //Generate a random new color
        let newColor = COLORS[Math.floor(Math.random()*4)];

        //Add to sequence and update state
        newSequence.push(newColor);

        this.setState({ sequence: newSequence });

    }

    async playSequence(){
        //Play the current sequence
        for(let i = 0; i < this.state.sequence.length ; i++){

            this.setState({currentSprite: this.sprites[this.state.sequence[i]]});
            await this.sleep(1300);
            
        }
        this.setState({currentSprite: null})
        console.log("done")
    }

    sleep(time) {
        return new Promise(res => setTimeout(res, time));
    }

    handleClick(buttonColor){
        
        // Return an event handler that has access to the buttonColor parameter
        return (e) =>{

            e.preventDefault()

            // Decide which sprite to render next based on buttonColor parameter
            let newSprite = this.sprites[buttonColor] || null;
            
            // Update the current sprite in state
            this.setState({
                currentSprite: newSprite,
            })

        }
        
    }

    render(){
        if(!this.state.loaded) return null;

        return(
            
            <section id="game">

                <div className="sprite-window">
                    {this.state.currentSprite}
                    <button onClick={this.playSequence}>play</button>
                </div>

                <div className="game-buttons">
                    <button onClick={this.handleClick("red")}>
                        Red
                    </button>

                    <button value="green" onClick={this.handleClick("green")}>
                        Green
                    </button>
                        
                    <button value="yellow" onClick={this.handleClick("yellow")}>
                        Yellow
                    </button>

                    <button value="blue" onClick={this.handleClick("blue")}>
                        Blue
                    </button>
                </div>
            </section>
        );
    }
}