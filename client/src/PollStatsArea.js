import React, { Component } from 'react';
import Chart from 'chart.js';

export default class PollStatsArea extends Component {
  render(){

    let title = this.props.mostPopularPoll ? this.props.mostPopularPoll.title : null;
    if (this.props.mostPopularPoll){
      let ctx = document.getElementById('most-popular-chart').getContext('2d');
      let poll = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: this.props.mostPopularPoll.options,
            datasets: [{
              data: this.props.mostPopularPoll.votes,
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
            maintainAspectRatio: true,
            legend: {
              display: true
            },
            scales: {
              display: false
            },
            scale: {
              display: false
            }
          }
        });
    }




    return (
      <div className="poll-stats-container">
        <div className="poll-stats-subcontainer">
          <h2>Most Popular Poll</h2>
          <h3>{title}</h3>
          <div style={{"height":"350px", "width":"350px", "margin":"0 auto"}}>
            <canvas style={{"margin":"0 auto"}} id="most-popular-chart"></canvas>
          </div>
        </div>

        <div className="poll-stats-subcontainer">
          <h2>Total Votes Across All Polls</h2>
          <div className="numeral-container">
            <p id="big-num">{this.props.totalVotes || null}</p>
          </div>
        </div>

      </div>
    )
  }
}
