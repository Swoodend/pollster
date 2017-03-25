import React, { Component } from 'react';
import NewPollForm from './NewPollForm';

class NewPoll extends Component {

  constructor(props){
    super(props);
    this.state  = {
      loggedIn : false
    }
  }

  componentWillMount(){
    if (localStorage.getItem('jwt')) {
      this.setState({
        loggedIn: true
      });
    }
  }

  render(){
    let content = this.state.loggedIn ? <NewPollForm/> : <h1>GottaLogIn</h1>
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default NewPoll;
