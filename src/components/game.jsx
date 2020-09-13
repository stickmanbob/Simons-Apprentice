///////////// Game /////////////////
//
// Renders the game itself and handles game logic
// 
// Props:
// - loaded(boolean) : lets us know if the App component has loaded all our images yet


// Imports

  //Utils
  import React from 'react';
  import { SIMON_GIF_LENGTH, PLAYER_GIF_LENGTH, FIZZLE_LENGTH, COLORS, } from '../utils/constants';

  //Components
  import GameOver from './gameOver';
  import SummoningCircle from './summoningCircle';
  import Elemental from './elemental';

    
//Main
export default class Game extends React.Component{

    constructor(props){
        super(props);

        //Set inital game state
        this.state = {
            currentSprite: null,
            loaded:true,
            // sequence: [this.randomColor()],
            sequence: [this.randomColor()],
            currentGuess: 0,
            gameState: "start",
            score: 0,
            disableInputs: true 
        }

        // Create references to sprites we will use here
        this.sprites = {
            red: <Elemental imageUrl={require("../assets/redSprite.png")}/>,
            yellow: <Elemental imageUrl={require("../assets/yellowSprite.png")}/>,
            green: <Elemental imageUrl={require("../assets/greenSprite.png")}/>,
            blue: <Elemental imageUrl={require("../assets/blueSprite.png")}/>,
            fizzle: <img className="fizzle" src={require("../assets/fizzle.gif")} alt="fizzle!" />,
        }   
        

        // Function Bindings
        this.handleInput = this.handleInput.bind(this);  
        this.playSequence = this.playSequence.bind(this); 
        this.resetGame = this.resetGame.bind(this);
        this.nextRound = this.nextRound.bind(this); 
    }

    randomColor(){
        return COLORS[Math.floor(Math.random() * 4)];
    }


    updateSequence(){
        
        // Create a copy of the old sequence to avoid mutating state
        let newSequence = Array.from(this.state.sequence);

        //Generate a random new color
        let newColor = this.randomColor();

        //Add to sequence and update state
        newSequence.push(newColor);

        this.setState({ sequence: newSequence });

    }

    async playSequence(){
        if(this.state.gameState !== 'simon-turn') this.setState({gameState: 'simon-turn'}); 

        //Pause before the sequence
        await this.sleep(500);

        //Play the current sequence
        for(let i = 0; i < this.state.sequence.length ; i++){

            // Display an elemental
            this.setState({ currentSprite: this.sprites[this.state.sequence[i]] } );
            
            //Wait for the gif to end
            await this.sleep(SIMON_GIF_LENGTH);
            
            //Remove the Elemental, and control to the player if its the last one

            if(i === this.state.sequence.length-1){
                
                // Give a break, then pass control to the player
                this.setState({
                    currentSprite: null,
                }) 

                await this.sleep(400); 

                this.setState({
                    disableInputs: false,
                    gameState: "player-turn"
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

        // First, add a new elemental to the sequence
        this.updateSequence(); 

        // Reset the game board
        this.setState({
            currentSprite: null,
            gameState: "",
            currentGuess: 0,
            disableInputs: true
        })

        // Play the new sequence
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

    async gameOver(){
        
        //Play the fizzle animation
        this.setState({
            currentSprite: this.sprites.fizzle,
            disableInputs: true
        })

        await this.sleep(FIZZLE_LENGTH);

        //Show the game over screen
        this.setState({
            gameState: "gameOver",
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
                        currentSprite: null
                    })
                    
                    await this.sleep(300);

                    this.setState({
                        gameState: "interRound",
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

    // Render a different message on top of the screen depending on the game state 
    selectMessage(){
        let gameState = this.state.gameState;

        switch (gameState){
            case "simon-turn":
                return (
                    <h1>Watch closely...</h1>
                );
            case "player-turn":
                return(
                    <h1>Use the Orbs to Summon Elementals in the Correct Order</h1>
                );
            case "start":
                return (
                    <div>
                        <h1>We will begin when you are ready</h1>
                        <h3>Touch the red pentagram to begin</h3>
                    </div>
                    
                )
            case "interRound":
                return(
                    <div>
                        <h1 className="victory">Good Job, Apprentice!</h1>
                        <h2>You have reached Rank {this.state.score}</h2>
                        <h3>Touch the red pentagram to continue</h3>
                    </div>
                )
            default:
                return null;
        }
    }

    // Render the summoning circle, with different things displayed depending on game state
    selectMainWindow() {
        let gameState = this.state.gameState;

        switch (gameState) {

            case 'start':
                let startButton = <img className="start-button" src={require("../assets/pentagram.png")} draggable="false" onClick={this.playSequence} alt="start"/>;
                return <SummoningCircle contents={startButton} />

            case 'interRound':
                let nextButton = <img className="start-button" src={require("../assets/pentagram.png")} draggable="false" onClick={this.nextRound} alt="next round"/>;
                return <SummoningCircle contents={nextButton} />;

            default:
                return <SummoningCircle contents={this.state.currentSprite} />;
        }
    }


    render(){

        let rank = this.state.score;

        // Show a loading screen if the assets have not loaded
        if(!this.props.loaded) return (
            <section>
                <h1>Loading...</h1>
                <div className="lds-circle"><div></div></div>
            </section>
        );
        
        // Show the game over screen if the player has lost
        if (this.state.gameState === "gameOver") return <GameOver rank={this.state.score} reset={this.resetGame} />;
        
        // Set up our game screen sub components
        let mainWindow = this.selectMainWindow();

        let enableButtons = this.state.disableInputs ? "" : "enable"

        let message = this.selectMessage();

        return(
            
            <section id="game">
                <div className="message-box">
                    {message}
                </div>
                

                <div className="main-window">
                    {mainWindow}
                </div>

                <div className="game-buttons">
                    
                    <img className={`orb red ${enableButtons}`} draggable="false" src={require("../assets/redOrb.png")} onClick={this.handleInput("red")} alt="red"/>

                    <img className={`orb green ${enableButtons}`} draggable="false" src={require("../assets/greenOrb.png")} onClick={this.handleInput("green")} alt="green"/>
                        
                    <img className={`orb yellow ${enableButtons}`} draggable="false" src={require("../assets/yellowOrb.png")} onClick={this.handleInput("yellow")} alt="blue"/>

                    <img className={`orb blue ${enableButtons}`} draggable="false" src={require("../assets/blueOrb.png")} onClick={this.handleInput("blue")} alt="yellow"/>

                </div>
                <div>
                    <span className="rank-counter">Apprentice Rank: {rank}</span>
                </div>
            </section>
        );
    }
}