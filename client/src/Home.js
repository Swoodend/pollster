import React, { Component } from 'react';
import MainImageDisplay from './MainImageDisplay';
import MainInfoDisplay from './MainInfoDisplay';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <MainImageDisplay />
        <MainInfoDisplay />
      </div>
    );
  }
}

export default Home;
