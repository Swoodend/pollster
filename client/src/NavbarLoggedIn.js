import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarLoggedIn extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    localStorage.removeItem("jwt");
    window.location.replace('http://localhost:3000/login');
  }
  render(){
    return (
      <div className="navbar">
        <div className="left">
          <div className="nav-title"><Link to="/">Pollster</Link></div>
        </div>
        <div className="right">
          <div className="username">{this.props.username}</div>
          <div className="polls"><div className="div-anchor">Polls</div></div>
          <div className="logout"><div onClick={this.handleLogout} className="div-anchor">Logout</div></div>
        </div>
      </div>
    );
  }
}

export default NavbarLoggedIn;
