import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App.jsx';

//Initialize high score list

if(!localStorage.simonsAppData || !JSON.parse(localStorage.simonsAppData)){
  localStorage.simonsAppData = JSON.stringify({
    scores:[
      { name: "Yendor", rank: 14 },
      { name: "Elon", rank: 13 },
      { name: "Harry Dresden", rank:12 },
      { name: "Glinda", rank: 11 },
      { name: "Gandalf the White", rank: 9 },
      { name: "Gandalf the Gray", rank: 8 },
      { name: "Hermione", rank: 6 },
      { name: "Oz", rank: 5 },
      { name: "Steve", rank: 3 },
      { name: "Alfred", rank: 2 },
      { name: "Morty", rank: 1 }
      
    ]
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
