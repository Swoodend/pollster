import React, { Component } from 'react';

class PollVotingForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      voteValue: ''
    }
  }

  componentDidMount(){
    try{
      window.twttr.widgets.load(document.getElementById('tb'));

    } catch(e){
      console.log(e);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('you submitted the form');
    this.props.updateChart(this.state.voteValue);
  }

  handleChange(e){
    this.setState({
      voteValue: e.target.value
    });
  }

  composeTweetMessage(){
    let leaderIndex = this.getPollLeader(this.props.votes);
    let pollLeader = this.props.options[leaderIndex];
    let maxVotes = this.props.votes[leaderIndex];
    let pluralOrNot = maxVotes > 1 ? "votes" : "vote"
    let tweet = `Hi friends! Come vote on my new poll: ${this.props.title} it looks like ${pollLeader} is winning with ${maxVotes} ${pluralOrNot}!`
    return this.percentEncode(tweet);
  }

  getPollLeader(arr){
    //returns index of largest number in array;
    let largest = arr.reduce((acc, num) => {
      return acc > num ? acc : num;
    })
    return arr.indexOf(largest);
  }

  percentEncode(str){
    str = str.replace(/\s/g, '%20');
    return str.replace(/[!?]/g, '%21');
  }

  render(){
    let options = this.props.options.map((option, i) => {
      return (
        <label onChange={this.handleChange} key={i} htmlFor={option}>
          <input type="radio" value={i} name="option" id={option}/>
          <span className="input-span">{option}</span>
        </label>
      );
    });

    let tweetMessage = this.composeTweetMessage();

    return (
      <div>
        <div className="voting-form-container">
          <form style={{textAlign:"center"}} onSubmit={this.handleSubmit}>
            {options}
            <input id="vote-button" type="submit" value="VOTE!"/>
            <a
            id="tb"
            className="tweet-btn twitter-share-button"
            href={"https://twitter.com/intent/tweet?text=" + tweetMessage}
            data-size="large"
            data-url={"http://localhost:3000/polls/" + this.props.id}
            >
              Tweet
            </a>
          </form>
        </div>
      </div>
    )
  }
}

export default PollVotingForm;
