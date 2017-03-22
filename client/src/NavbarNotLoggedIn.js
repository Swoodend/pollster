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
          <div className="login"><Link to="login" className="div-anchor">Login</Link></div>
          <div className="signup"><Link to="signup" className="div-anchor">Sign up</Link></div>
        </div>
      </div>
    )
  }
}

export default NavbarNotLoggedIn;
