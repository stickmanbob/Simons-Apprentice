///////////////// Game Over ////////////////
// Displays the game over screen, and handles logic to
// add new high scores
// 
// Props:
// - rank (integer) : the final score of the player
// - reset (function) : a function to reset the game
//

//Imports

import React from 'react';
import { Link } from 'react-router-dom';

// Main

export default class GameOver extends React.Component{

    constructor(props){
        super(props);

        // Initialize state
        this.state = {
            showHSInput: false,
            name: "Apprentice",
            highScore: false
        }

        // Function Bindings
        this.updateHighScores = this.updateHighScores.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);  
    }

    componentDidMount(){
        
        const { rank } = this.props;

        //Fetch the current high scores
        this.highScoreList = JSON.parse(localStorage.simonsAppData).scores;

        //Avoid bugs due to empty score lists
        let lastPlayer = this.highScoreList[this.highScoreList.length - 1] || {rank:0};


        // If the player's rank is higher than the lowest high score, or
        // there are fewer than 15 high scores, render the name input 
        if ((this.highScoreList.length < 15 && rank > 0) || rank > lastPlayer.rank) {

            this.setState({
                showHSInput: true,
                highScore: true
            })

        }
    }

    //Bind name input to state
    handleNameChange(e){
        e.preventDefault();

        this.setState({
            name: e.target.value
        })
    }

    // Either render the nav buttons or name input if the player made a high score
    navButtons(){

        if (!this.state.showHSInput){
            return (
                <nav>
                    <div onClick={this.props.reset} className="button">Try Again</div>
                    <Link to="/high-scores" >Honor Scroll</Link>
                </nav>
                
            )
        } else {
            return (

                <form>
                    <h3>Enter your name, Apprentice</h3>
                    <input maxLength="20" onChange={this.handleNameChange} value={this.state.name} type="text"/>
                    <input className="button" value="Done" type="submit" onClick={this.updateHighScores}/>
                </form>
            )
        }

    }

    updateHighScores(e){
        e.preventDefault();

        //Don't allow empty name submissions
        if(this.state.name.length === 0) return; 

        const name = this.state.name;
        const rank = this.props.rank;

        // Remove the last high score if there are already 15
        if(this.highScoreList.length >=15) this.highScoreList.pop(); 

        // Add the new score and reorder the list
        this.highScoreList.push({ name: name, rank: rank});
        this.highScoreList.sort((player1, player2) => player2.rank - player1.rank);

        // Save to local storage
        localStorage.simonsAppData = JSON.stringify({
            scores: this.highScoreList
        })

        // Get rid of the name input and show the nav buttons 
        this.setState({
            showHSInput: false,
        })
    }


    render(){

        const { rank } = this.props;
        let { highScore } = this.state;
        
        let message;
        if(highScore) {
            message = <h3>...but you made the Honor Scroll for reaching Rank {rank}!</h3>
        } else{
            message = <h3>...but you reached Apprentice Rank {rank}!</h3>
        }

        return (
            <section id="game-over">

                <h1>You Fizzled the Spell!</h1>

                {message} 

                {this.navButtons()}
            </section>
        )
    }
    
}
