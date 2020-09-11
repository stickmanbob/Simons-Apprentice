///////////////// App.js /////////////////////////////
// Entry point into the React App
//

//Imports

  //Utils
    import React from 'react';

    import './styles/index.scss';

  //Components
    import Game from "./components/game";


//Main
function App() {
  return (
    <div className="App">
        <Game/>
    </div>
  );
}

export default App;
