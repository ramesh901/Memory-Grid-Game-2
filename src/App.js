import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';

class App extends Component {
  render() {
      return (
      <div>
        <Game rows={5} columns ={5} activeCellsCount={6} maxGuess={3}/>
      </div>
      )
  }
}

export default App



