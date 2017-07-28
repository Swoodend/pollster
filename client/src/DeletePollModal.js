import React, { Component } from 'react';
//have to style this modal
export default class DeletePollModal extends Component {

  constructor(props){
    super(props);
    this.handleNoClicked = this.handleNoClicked.bind(this);
    this.handleYesClicked = this.handleYesClicked.bind(this);
  }

  handleNoClicked(){
    console.log('you clicked the no button');
    this.props.removeModal();
  }

  handleYesClicked(){
    console.log('you clicked the yes button with pollId', this.props.deletePollId);
  }

  render(){
    return (
      <div className="modal">
        <h5>Are you sure you want to delete the poll: {this.props.pollTitle}?</h5>
        <div className="btn-wrapper">
          <div onClick={this.handleYesClicked} className="yes-btn">
            YES
          </div>
          <div  onClick={this.handleNoClicked} className="no-btn">
            NO
          </div>
        </div>
      </div>
    )
  }
}
