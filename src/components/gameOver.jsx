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
        this.highScoreList = JSON.parse(localStorage.data).scores;

        // If the player's rank is higher than the lowest high score, 
        // render a modified different screen
        if (rank > this.highScoreList[this.highScoreList.length - 1].rank 
            || (this.highScoreList.length < 15 && rank > 0)) {

            this.setState({
                showHSInput: true,
                highScore: true
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
                    <div onClick={this.props.reset} className="no-text-outline">Try Again</div>
                    <Link to="/high-scores" className="no-text-outline">Honor Scroll</Link>
                </nav>
                
            )
        } else {
            return (

                <form>
                    <h3>Enter your name, Apprentice</h3>
                    <input className="no-text-outline" onChange={this.handleNameChange} value={this.state.name} type="text"/>
                    <input className="no-text-outline" type="submit" onClick={this.updateHighScores}/>
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
