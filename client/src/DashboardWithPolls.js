import React, { Component } from 'react';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';
import DeletePollButton from './DeletePollButton';
import DeletePollModal from './DeletePollModal';
import PollItemNoModal from './PollItemNoModal';
import PollItem from './PollItem';
import PollStatsArea from './PollStatsArea';

class DashboardWithPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      userPolls: '',
      totalVotes: 0,
      mostPopularPoll: null
    }

    this.pollDeleted = this.pollDeleted.bind(this);
  }

  componentWillMount(){
    this.getAllPolls();
  }

  getAllPolls(){
    let currentUser = localStorage.getItem('currentUser');
    let requestConfig = {
      method: "GET",
      headers: { "Content-type":"application/json" }
    }
    fetch('/'+ currentUser + '/polls', requestConfig)
      .then((res) => {
        return res.json();
      })
      .then((pollData) => {
        this.setState({
          userPolls: pollData,
          totalVotes: pollData.totalVotes,
          mostPopularPoll: pollData.mostPopularPoll
        })
      })
      .catch((err) => {
        if(err){
          console.log('something wrong with your fetch', err);
        }
      })
  }


  pollDeleted(id){
    //this method runs after a poll is deleted.
    //it removes deleted poll Obj from this component's state
    let newPollArray = this.removeTarget(this.state.userPolls.polls, id);
    let newUserPolls = {
      polls: newPollArray,
      status: "OK"
    }
    this.setState(
      {
        userPolls: newUserPolls
      }
    )
  }

  removeTarget(pollArr, id){
    for(let i = 0; i < pollArr.length; i++){
      if (pollArr[i].id === id){
        pollArr.splice(i, 1);
      }
    }
    return pollArr;
  }

  render(){

    let userPolls = this.state.userPolls.polls || [];
    let totalPolls = userPolls ? userPolls.length : 0;

    let pollData = userPolls.map((pollObj, index) => {
    let totalVotes = pollObj.votes.reduce((a, b) => {return a + b;});

      return (
        <PollItem
          key={index}
          id={pollObj.id}
          title={pollObj.title}
          totalVotes={totalVotes}
          displayModal={this.displayModal}
          pollDeleted={this.pollDeleted}
        />
      )
    })

    return (
      <div className="main-dash-container">
        <div className="left-nav-polls">
          <h3 style={{textAlign: "center", fontFamily:"Patua One"}}>My Polls</h3>
          {pollData}
          <hr/>
          <p style={{"paddingLeft":"15px", "fontSize":"1px", "fontFamily":"Asap, Arial"}}>Total polls: {totalPolls}</p>
        </div>
        <PollStatsArea totalVotes={this.state.totalVotes} mostPopularPoll={this.state.mostPopularPoll}/>
      </div>
    );
  }
}

export default DashboardWithPolls;
