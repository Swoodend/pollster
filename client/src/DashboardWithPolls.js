import React, { Component } from 'react';
import Chart from 'chart.js';

class DashboardWithPolls extends Component {

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
        this.displayPollData(pollData);
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
            '#FCB723'
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
    return (
      <div>
        <h1 style={{textAlign: "center"}}>A random poll you own</h1>
        <div className="canvas-container">
          <canvas id="chart"></canvas>
        </div>
      </div>
    );
  }
}

export default DashboardWithPolls;
