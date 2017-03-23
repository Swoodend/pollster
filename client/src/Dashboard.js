import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

  verifyLoggedIn(){
    return localStorage.getItem("jwt");
  }

  render(){
    let page = this.verifyLoggedIn() ?
      <h1>Welcome to dashboard</h1> :
      <Redirect
        to={{pathname: "/login",
        state: {type: "Warning", message:"Log in before viewing dashboard"}}}
      />
    return (
      <div>
        {page}
      </div>
    );
  }
}


export default Dashboard;
