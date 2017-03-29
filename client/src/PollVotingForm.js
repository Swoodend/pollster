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

  render(){
    let options = this.props.options.map((option, i) => {
      return (
        <label onChange={this.handleChange} key={i} htmlFor={option}>
          <input type="radio" value={i} name="option" id={option}/>
          <span className="input-span">{option}</span>
        </label>
      );
    });

    return (
      <div className="voting-form-container">
        <form onSubmit={this.handleSubmit}>
          {options}
          <input id="vote-button" type="submit" value="VOTE!"/>
        </form>
      </div>
    )
  }
}

export default PollVotingForm;
