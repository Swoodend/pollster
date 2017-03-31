import React, { Component } from 'react';
import DashboardPollDisplay from './DashboardPollDisplay';

class DashboardWithPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      pollData: ''
    };
  }

  getRandomPoll(arr, max){
    let index = Math.floor(Math.random() * (arr.length));
    return arr[index];
  }

  componentWillMount(){
    let currentUser = localStorage.getItem("currentUser");
    fetch(`/${currentUser}/polls`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        let poll = this.getRandomPoll(user.polls, user.polls.length)
        console.log('in dwp', poll);
        this.setState({
          pollData: poll
        });
      });
  }
  render(){
    let showPoll = this.state.pollData ? <DashboardPollDisplay pollInfo={this.state.pollData}/> : null;
    return (
      <div>
        {showPoll}
      </div>
    );
  }
}

export default DashboardWithPolls;
