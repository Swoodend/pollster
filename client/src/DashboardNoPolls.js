import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DashboardNoPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  componentWillMount(){
    let token = localStorage.getItem('jwt');
    console.log(token);
    fetch(`/validate/${token}`)
      .then((res) => {
        return res.json();
      })
      .then((userObj) => {
        //userObj --- {user: "swood"}
        this.setState({
          currentUser: userObj.user
        });
      })
  }


  render(){
    return (
      <div className="dash-container">
        <div className="dash-content">
          <h1 style={{"textAlign":"center"}}>{this.state.currentUser}, welcome to your dashboard.
            You have no polls yet.
          </h1>
          <div className="action-container">
            <div className="new-poll div-anchor"><Link to="/new">New Poll</Link></div>
            <div style={{"background": "#C1D42F"}} className="random-poll div-anchor">
              <Link to="#">Random</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardNoPolls;
