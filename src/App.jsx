///////////////// App.js /////////////////////////////
// Entry point into the React App
//

//Imports

  //Utils
    import React, { useState, useEffect } from 'react';
    import './styles/index.scss';
    import preloadImages from './utils/imageLoader';
    import { HashRouter, Switch, Route, Link } from 'react-router-dom';

  //Components
    import Game from "./components/game";

    import HighScores from './components/highScores';
    import { GAME_IMAGE_URLS, MENU_IMG_URLS } from './utils/constants';



//Main
function App() {

  var [menuLoaded, setMenuLoaded] = useState(false);
  var [gameLoaded, setGameLoaded] = useState(false);

  useEffect(()=>{
    if(!menuLoaded){
      preloadImages(MENU_IMG_URLS, ()=>setMenuLoaded(true));
    }

    if(!gameLoaded){
      preloadImages(GAME_IMAGE_URLS, ()=>setGameLoaded(true));
    }
  })

  if(!menuLoaded){
    return (
      <div>Loading...</div>
    )
  }

  return (
    
    <HashRouter>
      <div className="App">
        <Switch>

          <Route path="/game">
            <Game loaded={gameLoaded}/>
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
