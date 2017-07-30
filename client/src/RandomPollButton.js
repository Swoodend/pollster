import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';

export default class RandomPollButton extends Component {

  constructor(props){
    super(props);
    this.getRandomPoll = this.getRandomPoll.bind(this);
  }


  getRandomPoll(){
    console.log('clicked the btn');

    fetch('/polls/random')
      .then((res) => {
        return res.json();
      })
      .then((pollObj) => {
        if (pollObj.status === 'OK'){
          window.location.replace('/polls/' + pollObj.id);
        } else if (pollObj.status === 'null'){
          alert('There are no polls in our database!');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render(){
    return (
      <div onClick={this.getRandomPoll} style={{"background": "#C1D42F"}} className="random-poll div-anchor">
        Random
      </div>
    )
  }
}
