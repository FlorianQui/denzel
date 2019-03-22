import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListMovies from './components/ListMovies/ListMovies'
//import Discover from './components/Discover/Discover';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListMovies/>
      </div>
    );
  }
}

export default App;
