import React, { Component } from 'react';

class DeletePollButton extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.setModalState(this.props.pollTitle, this.props.pollId);
  }

  render(){
    return (
      <div onClick={this.handleClick} className="delete-btn">
        x
      </div>
    )
  }
}

export default DeletePollButton;
