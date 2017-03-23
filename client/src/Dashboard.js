import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  verifyLoggedIn(){
    return localStorage.getItem("jwt");
  }

  render(){
    let page = this.verifyLoggedIn() ? <h1>Welcome to dashboard</h1> : <Redirect to="/login"/>
    return (
      <div>
        {page}
      </div>
    );
  }
}


export default Dashboard;
