import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardNoPolls from './DashboardNoPolls';

class Dashboard extends Component {

  verifyLoggedIn(){
    return localStorage.getItem("jwt");
  }

  render(){
    let page = this.verifyLoggedIn() ?
      <DashboardNoPolls/> :
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
