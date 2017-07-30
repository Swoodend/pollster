import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RandomPollButton from './RandomPollButton';


class DashboardNoPolls extends Component {



  render(){
    let currentUser = localStorage.getItem("currentUser");
    return (
      <div className="dash-container">
        <div className="dash-content">
          <h1 style={{"textAlign":"center"}}>{currentUser}, welcome to your dashboard.
            You have no polls yet.
          </h1>
          <div className="action-container">
            <div className="new-poll div-anchor"><Link to="/new">New Poll</Link></div>
            <RandomPollButton />
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardNoPolls;
