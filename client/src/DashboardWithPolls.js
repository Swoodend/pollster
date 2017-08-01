import React, { Component } from 'react';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';
import DeletePollButton from './DeletePollButton';
import DeletePollModal from './DeletePollModal';
import PollItemNoModal from './PollItemNoModal';
import PollItemModal from'./PollItemModal';
import PollStatsArea from './PollStatsArea';

class DashboardWithPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      userPolls: '',
      displayingModal: false,
      deletePollId: null,
      totalVotes: 0,
      mostPopularPoll: null
    }

    this.displayModal = this.displayModal.bind(this);
    this.removeModal = this.removeModal.bind(this);
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
        }, () => {
          this.displayPollData(pollData);
        })
      })
      .catch((err) => {
        if(err){
          console.log('something wrong with your fetch', err);
        }
      })
  }

  displayPollData(pd){
    let pollData = pd.polls;
    console.log('in dpd', pollData);
    // let randomPoll = pollData[Math.floor(Math.random() * pollData.length)]
    // let ctx = document.getElementById('chart').getContext('2d');
    // let poll = new Chart(ctx, {
    //   type: 'bar',
    //   data : {
    //     labels: randomPoll.options,
    //     datasets: [{
    //       data: randomPoll.votes,
    //       backgroundColor: [
    //         'deepskyblue',
    //         '#FCB723',
    //         'orange',
    //         'rebeccapurple'
    //       ],
    //       borderColor: [
    //         'black',
    //         'black'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // })
  }

  displayModal(pollTitle, pollId){

    this.setState({
      displayingModal : pollTitle,
      deletePollId: pollId
    });
  }

  removeModal(){
    this.setState(
      {
        displayingModal: false,
        deletePollId: null
      }
    )
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
        displayingModal: false,
        deletePollId: null,
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
    let modal = this.state.displayingModal ?
      <DeletePollModal
        deletePollId={this.state.deletePollId}
        pollDeleted={this.pollDeleted}
        pollTitle={this.state.displayingModal}
        removeModal={this.removeModal}
      /> : null
    let pollData = userPolls.map((pollObj, index) => {
    let totalVotes = pollObj.votes.reduce((a, b) => {return a + b;});
      if (!modal){
        return (
          <PollItemNoModal
            key={index}
            id={pollObj.id}
            title={pollObj.title}
            totalVotes={totalVotes}
            displayModal={this.displayModal}
          />
        )
      } else {
        return (
          <PollItemModal
            key={index}
            deletePollId={this.state.deletePollId}
            pollTitle={this.state.displayingModal}
            id={pollObj.id}
            title={pollObj.title}
            totalVotes={totalVotes}
            displayModal={this.displayModal}
          />
        )
      }

    })

    return (
      <div className="main-dash-container">
        <div className="left-nav-polls">
          <h3 style={{textAlign: "center", fontFamily:"Patua One"}}>My Polls</h3>
          {pollData}
          {modal}
          <hr/>
          <p style={{"paddingLeft":"15px", "font-size":"16px", "font-family":"Asap, Arial"}}>Total polls: {totalPolls}</p>
        </div>
        <PollStatsArea totalVotes={this.state.totalVotes} mostPopularPoll={this.state.mostPopularPoll}/>
      </div>
    );
  }
}

export default DashboardWithPolls;
