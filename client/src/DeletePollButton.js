import React, { Component } from 'react';

class DeletePollButton extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('delete button was clicked!');
    console.log('props', this.props);
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
