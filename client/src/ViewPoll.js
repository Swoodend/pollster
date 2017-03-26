import React, { Component } from 'react';

class ViewPoll extends Component {

  constructor(props){
    super(props);
    this.state = {
      pollTitle: '',
      pollAuthor: '',
      pollOptions: '',
      pollVotes: ''
    }
  }

  componentWillMount(){
    let pollId = this.props.match.params.pollId;
    console.log(pollId);
    fetch(`/polls/${pollId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "OK"){
          console.log(
            res.pollData.title,
            res.pollData.author,
            res.pollData.options,
            res.pollData.votes
          )
        } else {
          console.log('something went wrong');
        }
      })
  }

  render(){
    return (
      <div>
        <h1 style={{"marginTop":"100px", "textAlign":"center"}}>Welcome to the ViewPoll page</h1>
        <div className="canvas-container">
          <canvas id="chart"></canvas>
        </div>
      </div>
    );
  }
}

export default ViewPoll
