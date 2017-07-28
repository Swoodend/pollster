import React, { Component } from 'react';

class DeletePollButton extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('delete button was clicked!');
    this.props.setModalState(this.props.pollTitle);
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
