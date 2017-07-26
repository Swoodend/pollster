import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarNotLoggedIn extends Component {
  render(){
    return (
      <div>
        <div className="navbar">
          <div className="left">
            <div className="nav-title"><Link to="/">Pollster</Link></div>
          </div>
          <div className="right">
            <div className="login"><Link to="/login" className="div-anchor">Login</Link></div>
            <div className="signup"><Link to="/signup" className="div-anchor">Sign up</Link></div>
          </div>
        </div>

        <div className="secondary-nav">
          <div className="sec-left">
            <div className="sec-nav-title"><Link to ="/">Pollster</Link></div>
          </div>
          <div className="sec-right"> Options <i className="fa fa-caret-down" aria-hidden="true"></i>
            <div className="sec-right-menu">
              <div className="sec-polls"><Link to="/login"><div className="div-anchor">Login</div></Link></div>
              <div className="sec-nav-new-poll"><Link to="/signup"><div className="div-anchor">Sign up</div></Link></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarNotLoggedIn;
