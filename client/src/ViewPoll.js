import React, { Component } from 'react';
import Chart from 'chart.js';
import PollVotingForm from './PollVotingForm';
import FlashMessage from './FlashMessage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
let poll;

class ViewPoll extends Component {

  constructor(props){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      pollTitle: '',
      pollAuthor: '',
      pollOptions: '',
      pollVotes: '',
      error: null
    }
  }

  componentDidMount(){
    console.log("CWM called");
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
            });
          });
        } else {
          console.log('unable to create poll');
        }
      })
  }

  updateChart(index){
    let pollId = this.props.match.params.pollId;
    console.log("POLLID", pollId);

    let requestConfig = {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        index
      })
    };

    fetch(`/polls/update/${pollId}`, requestConfig)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "OK"){
          //you sucessfully voted
          let updatedVotes = res.updatedVotes;
          this.setState({
            pollVotes: updatedVotes
          }, () => {
            console.log('poll votes set to', this.state.pollVotes);
            console.log(poll);
            poll.data.datasets[0].data = this.state.pollVotes;
            poll.update();
            console.log("POLL.UPDATE RAN");
          });
        } else {
          if (res.status === "Already voted"){
            let errorType = res.status;
            let errorMessage = "Sorry, but we have already received a vote from this machine. Your vote was not recorded."
            this.setState(
              {
                error: {
                  type: errorType,
                  message: errorMessage
                }
              }, () => {
                window.setTimeout(() => {
                  this.setState(
                    {
                      error : null
                    }
                  )
                }, 3000);
              }
            )
          } else {
            console.log('something VERY strange has occured');
          }
        }
      })

    // let votedOn = JSON.parse(JSON.stringify(localStorage.getItem("votedOn"))) || [];
    // let alreadyVoted = votedOn.indexOf(this.props.match.params.pollId) > -1 ? true : false;
    // let anonymousUser = !localStorage.getItem("currentUser");
    // if (!alreadyVoted){
    //   let updatedVotes = this.state.pollVotes.slice();
    //   updatedVotes[index] += 1;
    //   //save to db
    //   let pollId = this.props.match.params.pollId;

    //
    //   //this route needs to be fixed...no votes
    //   fetch(`/polls/update/${pollId}`, requestConfig)
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then ((res) => {
    //       if (res.status === "OK"){
    //         console.log('res completed successfully');
    //         this.setState({
    //           pollVotes: updatedVotes
    //         }, () => {
    //           console.log('chart state is now', this.state);
    //           console.log('poll is', poll);
    //           poll.data.datasets[0].data = this.state.pollVotes;
    //           poll.update();
    //         });
    //       } else if (res.status === "no poll found"){
    //         console.log('didnt find a poll');
    //       } else if (res.status === "already voted"){
    //         let errorType = 'Already Voted';
    //         let errorMessage = 'Sorry, but you have already voted on this poll. You cannot vote again.';
    //         this.setState({
    //           error: {type: errorType, message: errorMessage}
    //         }, () => {
    //           window.setTimeout(() => {
    //             this.setState({
    //               error: null
    //             })
    //           }, 2000)
    //         });
    //       } else if (res.status === "anon vote") {
    //           console.log('res completed successfully');
    //           this.setState({
    //             pollVotes: updatedVotes
    //           }, () => {
    //             console.log('chart state is now', this.state);
    //             console.log('poll is', poll);
    //             if (localStorage.getItem("votedOn")){
    //               let arr = JSON.parse(localStorage.getItem("votedOn"));
    //               arr.push(this.props.match.params.pollId);
    //               localStorage.setItem("votedOn", arr);
    //             } else {
    //               let arr = this.props.match.params.pollId.split();
    //               arr = JSON.stringify(arr);
    //               localStorage.setItem("votedOn", arr);
    //             }
    //             poll.data.datasets[0].data = this.state.pollVotes;
    //             poll.update();
    //           });
    //       }
    //     })
    // } else {
    //   let errorType = 'Already Voted';
    //   let errorMessage = 'Sorry, but you have already voted on this poll. You cannot vote again.';
    //   this.setState({
    //     error: {type: errorType, message: errorMessage}
    //   }, () => {
    //     window.setTimeout(() => {
    //       this.setState({
    //         error: null
    //       })
    //     }, 2000)
    //   });
    // }
  }

  render(){
    let error = this.state.error ?
      <FlashMessage type={this.state.error.type} message={this.state.error.message}/> : null;

    let votingOptions = this.state.pollOptions ?
      <PollVotingForm
        updateChart={this.updateChart}
        options={this.state.pollOptions}
      /> : null
    return (
      <div>
        <ReactCSSTransitionGroup transitionName={"flash"} transitionEnterTimeout={0} transitionLeaveTimeout={1000}>{error}</ReactCSSTransitionGroup>
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
