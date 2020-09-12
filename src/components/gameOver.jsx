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
            highScore: true
        }

        // Function Bindings
        this.updateHighScores = this.updateHighScores.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);  
    }

    componentDidMount(){
        
        const { rank } = this.props;

        //Fetch the current high scores
        this.highScoreList = JSON.parse(localStorage.data).scores;

        // If the player's rank is higher than the lowest high score, 
        // render a modified different screen
        if (rank > this.highScoreList[this.highScoreList.length - 1].rank 
            || (this.highScoreList.length < 15 && rank > 0)) {

            this.setState({
                showHSInput: true,
                highScoreRank: true
            })

        }
    }

    handleNameChange(e){
        e.preventDefault();

        this.setState({
            name: e.target.value
        })
    }

    navButtons(){

        if (!this.state.showHSInput){
            return (
                <nav>
                    <button onClick={this.props.reset}>Try Again</button>
                    <Link to="/high-scores">Honor Scroll</Link>
                </nav>
                
            )
        } else {
            return (

                <form>
                    <input placeholder="Enter your name, Apprentice" onChange={this.handleNameChange} value={this.state.name} type="text"/>
                    <button type="submit" onClick={this.updateHighScores}>Accept</button>
                </form>
            )
        }

    }

    updateHighScores(e){
        e.preventDefault();

        const name = this.state.name;
        const rank = this.props.rank;

        if(this.highScoreList.length >=15) this.highScoreList.pop(); 

        this.highScoreList.push({ name: name, rank: rank});
        this.highScoreList.sort((player1, player2) => player2.rank - player1.rank);

        localStorage.data = JSON.stringify({
            scores: this.highScoreList
        })

        this.setState({
            showHSInput: false,
        })
    }


    render(){

        const { rank } = this.props;
        let { highScore } = this.state;
        
        let message;
        if(highScore) {
            message = <h2>but you made the Honor Scroll for reaching apprentice rank {rank}!</h2>
        } else{
            message = <h2>but you reached apprentice rank {rank}!</h2>
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
