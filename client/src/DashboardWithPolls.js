import React, { Component } from 'react';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';
import DeletePollButton from './DeletePollButton';
import DeletePollModal from './DeletePollModal';

class DashboardWithPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      userPolls: '',
      displayingModal: false
    }

    this.displayModal = this.displayModal.bind(this);
    this.removeModal = this.removeModal.bind(this);
  }

  componentWillMount(){
    this.getRandomPolls();
  }

  getRandomPolls(){
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
          userPolls: pollData
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
    let randomPoll = pollData[Math.floor(Math.random() * pollData.length)]
    console.log(randomPoll);
    console.log(randomPoll.votes)
    let ctx = document.getElementById('chart').getContext('2d');
    let poll = new Chart(ctx, {
      type: 'bar',
      data : {
        labels: randomPoll.options,
        datasets: [{
          data: randomPoll.votes,
          backgroundColor: [
            'deepskyblue',
            '#FCB723',
            'orange',
            'rebeccapurple'
          ],
          borderColor: [
            'black',
            'black'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  displayModal(pollTitle){
    this.setState({
      displayingModal : pollTitle
    }, () => {
      console.log('now displaying modal', this.state.displayingModal);
    })
  }

  removeModal(){
    this.setState(
      {
        displayingModal: false
      }
    )
  }

  render(){
    console.log('render called');
    let userPolls = this.state.userPolls.polls || [];
    let modal = this.state.displayingModal ?
      <DeletePollModal removeModal={this.removeModal}
      pollTitle={this.state.displayingModal}
      /> : null
    let pollData = userPolls.map((pollObj, index) => {
    let totalVotes = pollObj.votes.reduce((a, b) => {return a + b;});
      if (!modal){
        return (
          <div key={index} style={{position:"relative"}}>
            <Link to={`/polls/${pollObj.id}`}>
              <div className="poll-item div-anchor">
                <div className="poll-title">{pollObj.title}</div>
                <div className="poll-votes">Total votes: {totalVotes}</div>
              </div>
            </Link>
            <DeletePollButton pollTitle={pollObj.title} setModalState={this.displayModal}/>
          </div>
        )
      } else {
        return (
          <div key={index}>
            <DeletePollModal pollTitle={this.state.displayingModal}/>
            <div key={index} style={{position:"relative"}}>
              <Link to={`/polls/${pollObj.id}`}>
                <div className="poll-item div-anchor">
                  <div className="poll-title">{pollObj.title}</div>
                  <div className="poll-votes">Total votes: {totalVotes}</div>
                </div>
              </Link>
              <DeletePollButton pollTitle={pollObj.title} setModalState={this.displayModal}/>
            </div>
          </div>
        )
      }

    })

    return (
      <div>
        <h1 style={{textAlign: "center"}}>A random poll you own</h1>
        <div className="left-nav-polls">
          <h3 style={{textAlign: "center"}}>My Polls</h3>
          {pollData}
          {modal}
        </div>
        <div style={{position: "relative", height: "75vh", width:"75vw", display:"flex", float:"right"}}>
          <canvas id="chart"></canvas>
        </div>
      </div>
    );
  }
}

export default DashboardWithPolls;
