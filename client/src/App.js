import React, { Component } from 'react';
import Navbar from './Navbar';
import MainImageDisplay from './MainImageDisplay';
import MainInfoDisplay from './MainInfoDisplay';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <MainImageDisplay />
        <MainInfoDisplay />
      </div>
    );
  }
}

export default App;
