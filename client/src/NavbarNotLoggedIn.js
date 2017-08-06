import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarLoggedOutRegular from './NavbarLoggedOutRegular';
import NavbarLoggedOutMobile from './NavbarLoggedOutMobile';

class NavbarNotLoggedIn extends Component {
  render(){
    return (
      <div>
        <NavbarLoggedOutRegular/>
        <NavbarLoggedOutMobile/>
      </div>
    )
  }
}

export default NavbarNotLoggedIn;
