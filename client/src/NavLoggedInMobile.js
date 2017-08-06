import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavLoggedInMobile extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isOpen: false
    }

  }

  handleClick(e){
    e.stopPropagation();
    console.log('clicky');
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  render(){
    if (!this.state.isOpen){
      return (
        <div className="secondary-nav">
          <div className="sec-left">
            <div className="sec-nav-title"><Link to="/">Pollster</Link></div>
          </div>
          <div className="sec-right"> Options <i className="fa fa-caret-down" aria-hidden="true"></i>
            <div className="sec-right-menu">
              <div className="sec-username">{this.props.username}</div>
              <div className="sec-polls"><div className="overlay"><Link to="/dashboard"><div onClick={this.handleClick} className="div-anchor">Polls</div></Link></div></div>
              <div className="sec-nav-new-poll"><div className="overlay"><Link to="/new"><div onClick={this.handleClick}  className="div-anchor">New Poll</div></Link></div></div>
              <div className="sec-logout"><div className="overlay"><div onClick={this.props.handleLogout} className="div-anchor">Logout</div></div></div>
            </div>
          </div>
        </div>
      )
    } else {
        return (
          <div className="secondary-nav">
            <div className="sec-left">
              <div className="sec-nav-title"><Link to="/">Pollster</Link></div>
            </div>
            <div className="sec-right"> Options <i className="fa fa-caret-down" aria-hidden="true"></i>
              <div style={{"display":"none"}} className="sec-right-menu">
                <div className="sec-username">{this.props.username}</div>
                <div className="sec-polls"><div className="overlay"><Link to="/dashboard"><div onClick={this.handleClick} className="div-anchor">Polls</div></Link></div></div>
                <div className="sec-nav-new-poll"><div className="overlay"><Link to="/new"><div onClick={this.handleClick}  className="div-anchor">New Poll</div></Link></div></div>
                <div className="sec-logout"><div className="overlay"><div onClick={this.props.handleLogout} className="div-anchor">Logout</div></div></div>
              </div>
            </div>
          </div>
        )
    }
  }
}
