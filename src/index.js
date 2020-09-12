import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App.jsx';

//Initialize high score list

if(!JSON.parse(localStorage.data)){
  localStorage.data = JSON.stringify({
    scores:[
      {name: "Harry Dresden", rank:30 }
    ]
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
