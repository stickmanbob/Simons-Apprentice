///////////// Game /////////////////
//
// Renders the game itself and handles game logic
// 
// Props:


// Imports

  //Utils
  import React from 'react';
  import { SIMON_GIF_LENGTH, PLAYER_GIF_LENGTH, FIZZLE_LENGTH, COLORS, IMAGE_URLS } from '../utls/constants';
  import preloadImages from "../utls/imageLoader";

  //Components
  import GameOver from './gameOver';
  
  import SummoningCircle from './summoningCircle';

    
//Main



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
    }

    fetchSprites(){

        // Fetch all sprites needed for gameplay and add them to the browser cache

        preloadImages(IMAGE_URLS, ()=> this.setState({ loaded: true }))


        // Create references to sprites we will use here
        this.sprites = {
            red: <img src={require("../assets/redSprite.gif")} alt="red" />,
            yellow: <img src={require("../assets/yellowSprite.gif")} alt="yellow" />,
            green: <img src={require("../assets/greenSprite.gif")} alt="green" />,
            blue: <img src={require("../assets/blueSprite.gif")} alt="blue" />,
            fizzle: <img className="fizzle" src={require("../assets/fizzle.gif")} alt="fizzle!"/>,
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
        if(this.state.gameState !== 'simon-turn') await this.setState({gameState: 'simon-turn'}); 
        //Play the current sequence
        for(let i = 0; i < this.state.sequence.length ; i++){

            // Display an elemental
            this.setState({ currentSprite: this.sprites[this.state.sequence[i]] } );
            
            //Wait for the gif to end
            await this.sleep(SIMON_GIF_LENGTH);
            
            //Remove the Elemental, and control to the player if its the last one

            if(i === this.state.sequence.length-1){
                this.setState({
                    currentSprite: null,
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

    selectMessage(){
        let gameState = this.state.gameState;

        switch (gameState){
            case "simon-turn":
                return (
                    <h1>Watch closely...</h1>
                );
            case "player-turn":
                return(
                    <h1>Use the Orbs to Summon the Elementals in the Correct Order</h1>
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
                        <h1>Good Job, Apprentice!</h1>
                        <h2>You have reached Rank {this.state.score}</h2>
                        <h3>Touch the red pentagram to continue</h3>
                    </div>
                )
            default:
                return null;
        }
    }

    selectMainWindow() {
        let gameState = this.state.gameState;

        switch (gameState) {

            case 'start':
                let startButton = <img className="start-button" src={require("../assets/pentagram.png")} onClick={this.playSequence} alt="start"/>;
                return <SummoningCircle contents={startButton} />

            case 'interRound':
                let nextButton = <img className="start-button" src={require("../assets/pentagram.png")} onClick={this.nextRound} alt="next round"/>;
                return <SummoningCircle contents={nextButton} />;

            default:
                return <SummoningCircle contents={this.state.currentSprite} />;
        }
    }


    render(){

        let rank = this.state.score;

        if(!this.state.loaded) return (
            <section>
                <h1>Loading...</h1>
            </section>
        );

        if (this.state.gameState === "gameOver") return <GameOver rank={this.state.score} reset={this.resetGame} />;

        let mainWindow = this.selectMainWindow();

        let enableButtons = this.state.disableInputs ? "" : "enable"

        let message = this.selectMessage();

        return(
            
            <section id="game">

                {message}

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