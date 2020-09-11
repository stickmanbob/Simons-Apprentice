///////////// Game /////////////////
//
// Renders the game itself and handles game logic
// 
// Props:


// Imports

import React from 'react';
import GameOver from './gameOver';
import InterRound from './interRound';


//Main

const COLORS = ["red", "blue", "yellow", "green"]; 

export default class Game extends React.Component{

    constructor(props){
        super(props);

        //Set inital game state
        this.state = {
            currentSprite: null,
            loaded:false,
            sequence: ["red"],
            currentGuess: 0,
            gameState: "start",
            score: 0
        }

        

        // Function Bindings
        this.handleClick = this.handleClick.bind(this); 
        this.fetchSprites = this.fetchSprites.bind(this); 
        this.playSequence = this.playSequence.bind(this); 
        this.resetGame = this.resetGame.bind(this); 
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

            this.setState({ currentSprite: this.sprites[this.state.sequence[i]], gameState: "input" } );
            await this.sleep(1300);
            this.setState({ currentSprite: null,})
            await this.sleep(400); 
            
        }
        
    }

    sleep(time) {
        return new Promise(res => setTimeout(res, time));
    }

    nextGuess(){
        this.setState({
            currentSprite: null,
            currentGuess: this.state.currentGuess + 1,
        })
    }

    nextRound(){

        this.updateSequence(); 

        this.setState({
            currentSprite: null,
            gameState: "start",
            score: this.state.score + 1,
            currentGuess: 0
        })
    }

    resetGame(){
        this.setState({
            currentSprite: null,
            sequence: ["red"],
            currentGuess: 0,
            gameState: "start",
            score: 0
        })
    }

    gameOver(){
        this.setState({
            gameState: "gameOver",
        })
    }

    handleClick(buttonColor){
        
        // Return an event handler that has access to the buttonColor parameter
        return async (e) =>{
            
            e.preventDefault();

            var { sequence, currentGuess } = this.state;

            // Check if the input is correct
            if(buttonColor === sequence[currentGuess]){ // If its a correct guess:
                
                // Decide which sprite to render next based on buttonColor parameter
                let newSprite = this.sprites[buttonColor] || null;

                // Update the current sprite in state
                this.setState({
                    currentSprite: newSprite,
                })

                await this.sleep(1300);

                // If that was the last item, go to the inter round screen
                if(currentGuess === sequence.length -1){
                    
                    this.setState({
                        gameState: "interRound",
                        currentSprite: null
                    });
                
                // Otherwise, let the user keep summoning elementals
                } else {
                    this.nextGuess(); 
                }
            
            } else { // On a wrong guess, end the game
                this.gameOver();
            }
   

        }
        
    }

    render(){
        if(!this.state.loaded) return null;

        if(this.state.gameState === 'gameOver') return <GameOver rank={this.state.score} reset={this.resetGame}/>

        let gameState = this.state.gameState;
        let rank = this.state.score; 

        return(
            
            <section id="game">

                <div className="sprite-window">
                    {this.state.currentSprite}
                    {gameState === 'interRound' && <InterRound rank={rank} nextRound={this.nextRound}/>}
                    {gameState === "start" && <button onClick={this.playSequence}>play</button>}
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

                    <div>
                        <span>Apprentice Rank: {rank}</span>
                    </div>
                </div>
            </section>
        );
    }
}