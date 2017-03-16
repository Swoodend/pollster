import React, { Component } from 'react';

class Navbar extends Component {
  render(){
    return (
      <div className="navbar">
        <div className="left">
          <div className="nav-title">Pollster</div>
        </div>
        <div className="right">
          <div className="login"><a href="login" className="div-anchor">Login</a></div>
          <div className="signup"><a href="signup" className="div-anchor">Sign up</a></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
