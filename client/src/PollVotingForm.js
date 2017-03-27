import React, { Component } from 'react';

class PollVotingForm extends Component{

  render(){
    console.log('in pvf render with', this.props.options);
    let options = this.props.options.map((option, i) => {
      return (
        <div key={i}>
          <label key={i+1}>{option}</label>
          <input key={i+2} value={i} type="radio" name="option"/>
        </div>
      );
    });
    console.log('options is now', options);
    return (
      <div className="voting-form-container">
        <form>
          {options}
          <input id="vote-button" type="submit" value="VOTE!"/>
        </form>
      </div>
    )
  }
}

export default PollVotingForm;
