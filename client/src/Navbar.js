import React, { Component } from 'react';
import NavbarNotLoggedIn from './NavbarNotLoggedIn';
import NavbarLoggedIn from './NavbarLoggedIn';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false
    }
  }

  componentDidMount(){
    console.log('navbar mounting: state is: loggedIn', this.state.loggedIn);
    let token = localStorage.getItem('jwt');
    fetch(`/validate/${token}`)
      .then((res) => {
        return res.json();
      })
      .then((token) => {
        if (token && token.user){
          this.setState({
            loggedIn : token.user
          });
        }
      })
  }
  render(){
    let nav = this.state.loggedIn ? <NavbarLoggedIn username={this.state.loggedIn}/> : <NavbarNotLoggedIn/>
    return (
      <div>
        {nav}
      </div>
    );
  }
}

export default Navbar;
