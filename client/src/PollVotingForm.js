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
    window.twttr.widgets.load();
  }


  handleSubmit(e){
    e.preventDefault();
    this.props.updateChart(this.state.voteValue)
      .then(() => {
        let btnContainer = document.getElementById("tbc");
        let btn = document.getElementById("twitter-widget-0");
        btnContainer.removeChild(btn);
        let tweetMessage = this.composeTweetMessage();
        let anchor = document.createElement('a');
        anchor.setAttribute('class', 'tweet-btn');
        anchor.setAttribute('class', 'twitter-share-button');
        anchor.setAttribute('href', "https://twitter.com/intent/tweet?text=" + tweetMessage);
        anchor.setAttribute('data-size', 'large');
        anchor.innerHTML = "Tweet"
        document.getElementById("tbc").appendChild(anchor);
        window.twttr.widgets.load();
      })

  }

  handleChange(e){
    this.setState({
      voteValue: e.target.value
    });
  }

  composeTweetMessage(){
    let pluralOrNot = this.props.pollLeaderVotes > 1 || this.props.pollLeaderVotes === 0 ? "votes" : "vote"
    let tweet = `Hi friends! Come vote on my new poll: ${this.props.title} it looks like ${this.props.pollLeader} is winning with ${this.props.pollLeaderVotes} ${pluralOrNot}!`
    return this.percentEncode(tweet);
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
            <div id="tbc">
              <a
              id="tb"
              className="tweet-btn twitter-share-button"
              href={"https://twitter.com/intent/tweet?text=" + tweetMessage}
              data-size="large"
              data-url={"http://localhost:3000/polls/" + this.props.id}
              >
                Tweet
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default PollVotingForm;
