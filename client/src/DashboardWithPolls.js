import React, { Component } from 'react';
import Chart from 'chart.js';
import { Link } from 'react-router-dom';

class DashboardWithPolls extends Component {

  constructor(props){
    super(props);
    this.state = {
      userPolls: ''
    }
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

  render(){
    let userPolls = this.state.userPolls.polls || [];
    let pollData = userPolls.map((pollObj, index) => {
      return (
        <Link key={index} to={`/polls/${pollObj.id}`}><p>{pollObj.title}</p></Link>
      )
    })

    return (
      <div>
        <h1 style={{textAlign: "center"}}>A random poll you own</h1>
        <div className="left-nav-polls">
          {pollData}
        </div>
        <div style={{position: "relative", height: "75vh", width:"75vw", display:"flex", float:"right"}}>
          <canvas id="chart"></canvas>
        </div>
      </div>
    );
  }
}

export default DashboardWithPolls;
