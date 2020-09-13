import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App.jsx';

//Initialize high score list

if(!JSON.parse(localStorage.data)){
  localStorage.data = JSON.stringify({
    scores:[
      { name: "Yendor", rank: 34 },
      { name: "Elon", rank: 32 },
      { name: "Harry Dresden", rank:30 },
      { name: "Glinda", rank: 28 },
      { name: "Gandalf the White", rank: 26 },
      { name: "Gandalf the Gray", rank: 24 },
      { name: "Hermione", rank: 20 },
      { name: "Oz", rank: 18 },
      { name: "Steve", rank: 10 },
      { name: "Alfred", rank: 8 },
      { name: "Morty", rank: 4 }
      
    ]
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
