import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarNotLoggedIn extends Component {
  render(){
    return (
      <div className="navbar">
        <div className="left">
          <div className="nav-title"><Link to="/">Pollster</Link></div>
        </div>
        <div className="right">
          <div className="polls"><div className="div-anchor">Polls</div></div>
          <div className="logout"><div className="div-anchor">Logout</div></div>
        </div>
      </div>
    );
  }
}

export default NavbarNotLoggedIn;
