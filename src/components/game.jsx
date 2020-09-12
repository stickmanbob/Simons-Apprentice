///////////// Game /////////////////
//
// Renders the game itself and handles game logic
// 
// Props:


// Imports

  //Utils
  import React from 'react';
  import { SIMON_GIF_LENGTH, PLAYER_GIF_LENGTH } from '../constants';

  //Components
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
            score: 0,
            disableInputs: true 
        }

        

        // Function Bindings
        this.handleInput = this.handleInput.bind(this); 
        this.fetchSprites = this.fetchSprites.bind(this); 
        this.playSequence = this.playSequence.bind(this); 
        this.resetGame = this.resetGame.bind(this);
        this.nextRound = this.nextRound.bind(this); 
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

            // Display an elemental
            this.setState({ currentSprite: this.sprites[this.state.sequence[i]], gameState: "input" } );
            
            //Wait for the gif to end
            await this.sleep(SIMON_GIF_LENGTH);
            
            //Remove the Elemental, and enable buttons if its the last one

            if(i === this.state.sequence.length-1){
                this.setState({
                    currentSprite: null,
                    disableInputs: false
                }) 
            } else{
                this.setState({ currentSprite: null, })

            }
            
            //Give a gap between Elementals
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
            disableInputs: false,
        })
    }

    nextRound(){

        this.updateSequence(); 

        this.setState({
            currentSprite: null,
            gameState: "",
            currentGuess: 0,
            disableInputs: true
        })

        this.playSequence(); 
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
            disableInputs: true 
        })
    }

    handleInput(buttonColor){
        
        // If buttons are disabled, return a handler that does nothing
        if(this.state.disableInputs) return (e) => e.preventDefault(); 

        // Return an event handler that has access to the buttonColor parameter
        return async (e) =>{
            
            e.preventDefault();

            var { sequence, currentGuess } = this.state;

            // Check if the input is correct
            if(buttonColor === sequence[currentGuess]){ // If its a correct guess:
                
                // Decide which sprite to render next based on buttonColor parameter
                let newSprite = this.sprites[buttonColor] || null;

                // Update the current sprite in state and prevent further inputs
                this.setState({
                    currentSprite: newSprite,
                    disableInputs: true, 
                })

                // Wait for the gif to play
                await this.sleep(PLAYER_GIF_LENGTH);

                // If that was the last item, go to the inter round screen
                if(currentGuess === sequence.length -1){
                    
                    this.setState({
                        gameState: "interRound",
                        currentSprite: null,
                        score: this.state.score + 1,
                        disableInputs: true,
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

        let disableButtons = this.state.disableInputs ? "disable" : ""

        return(
            
            <section id="game">

                <div className="sprite-window">
                    {this.state.currentSprite}
                    {gameState === 'interRound' && <InterRound rank={rank} nextRound={this.nextRound}/>}
                    {gameState === "start" && <button onClick={this.playSequence}>play</button>}
                </div>

                <div className={`game-buttons ${disableButtons}`}>
                    
                    <button onClick={this.handleInput("red")}>
                        Red
                    </button>

                    <button  onClick={this.handleInput("green")}>
                        Green
                    </button>
                        
                    <button onClick={this.handleInput("yellow")}>
                        Yellow
                    </button>

                    <button onClick={this.handleInput("blue")}>
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