import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLoggedInMobile from './NavLoggedInMobile';
import NavbarLoggedInRegular from './NavbarLoggedInRegular';

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
        <NavbarLoggedInRegular username={this.props.username} handleLogout={this.handleLogout}/>
        <NavLoggedInMobile handleLogout={this.handleLogout}/>
      </div>

    );
  }
}

export default NavbarLoggedIn;
