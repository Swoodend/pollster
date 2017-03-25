import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    let content = this.state.loggedIn ? <NewPollForm/> :
    <Redirect
      to={{pathname: "/login",
      state: {type: "Warning", message:"Log in to create new polls"}}}
    />
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default NewPoll;
