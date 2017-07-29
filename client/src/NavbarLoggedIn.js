import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarLoggedIn extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");
    window.location.replace('http://localhost:3000/login');
  }
  render(){
    return (
      <div>
        <div className="navbar">
          <div className="left">
            <div className="nav-title"><Link to="/">Pollster</Link></div>
          </div>
          <div className="right">
            <div className="username">{this.props.username}</div>
            <div className="polls"><div className="overlay"><a href="/dashboard"><div className="div-anchor">Polls</div></a></div></div>
            <div className="nav-new-poll"><div className="overlay"><Link to="/new"><div className="div-anchor">New Poll</div></Link></div></div>
            <div className="logout"><div className="overlay"><div onClick={this.handleLogout} className="div-anchor">Logout</div></div></div>
          </div>
        </div>

        <div className="secondary-nav">
          <div className="sec-left">
            <div className="sec-nav-title"><Link to="/">Pollster</Link></div>
          </div>
          <div className="sec-right"> Options <i className="fa fa-caret-down" aria-hidden="true"></i>
            <div className="sec-right-menu">
              <div className="sec-username">{this.props.username}</div>
              <div className="sec-polls"><div className="overlay"><Link to="/dashboard"><div className="div-anchor">Polls</div></Link></div></div>
              <div className="sec-nav-new-poll"><div className="overlay"><Link to="/new"><div className="div-anchor">New Poll</div></Link></div></div>
              <div className="sec-logout"><div className="overlay"><div onClick={this.handleLogout} className="div-anchor">Logout</div></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLoggedIn;
