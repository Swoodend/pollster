import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarLoggedOutRegular extends Component {

  render() {
      return (
        <div className="navbar">
          <div className="left">
            <div className="nav-title"><Link to="/">Pollster</Link></div>
          </div>
          <div className="right">
            <div className="login"><div className="overlay"><Link to="/login" className="div-anchor">Login</Link></div></div>
            <div className="signup"><div className="overlay"><Link to="/signup" className="div-anchor">Sign up</Link></div></div>
          </div>
        </div>
      )
  }
}
