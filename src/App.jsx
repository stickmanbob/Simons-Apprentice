///////////////// App.js /////////////////////////////
// Entry point into the React App
//

//Imports

  //Utils
    import React, { useState, useEffect } from 'react';

    import './styles/index.scss';


    import { HashRouter, Switch, Route, Link } from 'react-router-dom';

  //Components
    import Game from "./components/game";

import HighScores from './components/highScores';


//Main
function App() {

  var [loaded, setLoaded] = useState(false);


  return (
    <HashRouter>
      <div className="App">
        <Switch>

          <Route path="/game">
            <Game />
          </Route>
          
          <Route path="/high-scores">
            <HighScores />
          </Route>

          <Route path="/">
            <Link to="/game">Play!</Link>
          </Route>
          
        </Switch>
          
      </div>
    </HashRouter>
  );
}

export default App;
