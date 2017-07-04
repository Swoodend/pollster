import React, { Component } from 'react';
  import Chart from 'chart.js';
import PollVotingForm from './PollVotingForm';
let poll;
class ViewPoll extends Component {

  constructor(props){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      pollTitle: '',
      pollAuthor: '',
      pollOptions: '',
      pollVotes: ''
    }
  }

  componentWillMount(){
    let pollId = this.props.match.params.pollId;
    fetch(`/polls/${pollId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "OK"){
          this.setState({
            pollTitle: res.pollData.title,
            pollAuthor: res.pollData.author,
            pollOptions: res.pollData.options,
            pollVotes: res.pollData.votes
          }, () => {
            let ctx = document.getElementById('chart').getContext('2d');
            poll = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: this.state.pollOptions,
                datasets: [{
                  data: this.state.pollVotes,
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
            });
          });
        } else {
          console.log('unable to create poll');
        }
      })
  }

  updateChart(index){
    console.log('you called update chart with index', index);
    let updatedVotes = this.state.pollVotes.slice();
    updatedVotes[index] += 1;
    //save to db
    let pollId = this.props.match.params.pollId;
    let requestConfig = {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        newVoteState: updatedVotes
      })
    };

    console.log('pollid', pollId);
    fetch(`/polls/update/${pollId}`, requestConfig)
      .then((res) => {
        return res.json();
      })
      .then ((res) => {
        if (res.status === "OK"){
          console.log('res completed successfully');
          this.setState({
            pollVotes: updatedVotes
          }, () => {
            console.log('chart state is now', this.state);
            console.log('poll is', poll);
            poll.data.datasets[0].data = this.state.pollVotes;
            poll.update();
          });
        } else if (res.status === "no poll found"){
          console.log('didnt find a poll');
        }
      })

  }

  render(){
    let votingOptions = this.state.pollOptions ?
      <PollVotingForm
        updateChart={this.updateChart}
        options={this.state.pollOptions}
      /> : <h1 style={{"position":"absolute", "top": "35px"}}>No poll found</h1>;
    return (
      <div>
        <h1 style={{"marginTop":"100px", "textAlign":"center"}}>{this.state.pollTitle}</h1>
        <div className="canvas-container">
          <canvas id="chart"></canvas>
        </div>
        {votingOptions}
      </div>
    );
  }
}

export default ViewPoll
