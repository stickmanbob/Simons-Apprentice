///////////////// App.js /////////////////////////////
// Entry point into the React App
//

//Imports

  //Utils
    import React from 'react';

    import './styles/index.scss';

  //Components
    import Game from "./components/game";
import HighScores from './components/highScores';


//Main
function App() {
  return (
    <div className="App">
        {/* <Game/> */}
        <HighScores/>
    </div>
  );
}

export default App;
