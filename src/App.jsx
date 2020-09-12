///////////////// App.js /////////////////////////////
// Entry point into the React App
//

//Imports

  //Utils
    import React, { useState, useEffect } from 'react';
    import './styles/index.scss';
    import preloadImages from './utils/imageLoader';
    import { HashRouter, Switch, Route, Link } from 'react-router-dom';
    import { GAME_IMAGE_URLS, MENU_IMG_URLS } from './utils/constants';

  //Components
    import Game from "./components/game";

    import HighScores from './components/highScores';

    import MainMenu from './components/menu';

    import Header from "./components/header";



//Main
function App() {

  // Keep track of what assets have been loaded
  var [menuLoaded, setMenuLoaded] = useState(false);
  var [gameLoaded, setGameLoaded] = useState(false);

  // On start, preload all images for the menu and game
  useEffect(()=>{

    // We can render the menu first as soon as its assets are loaded
    if(!menuLoaded){
      preloadImages(MENU_IMG_URLS, ()=>setMenuLoaded(true));
    }

    // gameLoaded will be passed as a prop to the Game component,
    // so if the user tries to play before the assets load they will
    // get a loading screen
    if(!gameLoaded){
      preloadImages(GAME_IMAGE_URLS, ()=>setGameLoaded(true));
    }
  })

  //If menu assets are not loaded, show a loading screen
  if(!menuLoaded){
    return (
      <div>Loading...</div>
    )
  }

  // Don't show the header on the game screen if the device is too short
  let header = <Header />;
  console.log(window.innerHeight)
  if(window.innerHeight < 600){
    header = null;
  }

  return (

    <div className="App">
      <HashRouter>
        <Switch>

          <Route path="/game">
            {header}
          </Route>

          <Route path="/">
            <Header />
          </Route> 
          
        </Switch>
      
      
        <Switch>

          <Route path="/game">
            <Game loaded={gameLoaded}/>
          </Route>
          
          <Route path="/high-scores">
            <HighScores />
          </Route>

          <Route path="/">
            <MainMenu/>
          </Route>
          
        </Switch>
          
      </HashRouter>
    </div>
  );
}

export default App;
