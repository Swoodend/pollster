import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class NavbarLoggedInRegular extends Component {
  render(){
    return (
      <div className="navbar">
        <div className="left">
          <div className="nav-title"><Link to="/">Pollster</Link></div>
        </div>
        <div className="right">
          <div className="username">{this.props.username}</div>
          <div className="polls"><div className="overlay"><Link to="/dashboard"><div className="div-anchor">Polls</div></Link></div></div>
          <div className="nav-new-poll"><div className="overlay"><Link to="/new"><div className="div-anchor">New Poll</div></Link></div></div>
          <div className="logout"><div className="overlay"><div onClick={this.props.handleLogout} className="div-anchor">Logout</div></div></div>
        </div>
      </div>
    )
  }
}
