import React, { Component } from 'react';
//have to style this modal
export default class DeletePollModal extends Component {

  constructor(props){
    super(props);
    this.handleNoClicked = this.handleNoClicked.bind(this);
    this.handleYesClicked = this.handleYesClicked.bind(this);
  }

  handleNoClicked(){
    this.props.removeModal();
  }

  handleYesClicked(){
    //this.props.deletepollId;
    console.log('clicked yes button');
    let requestConfig = {
      method: "DELETE",
      body: JSON.stringify({
        id: this.props.deletePollId
      }),
      headers: { "Content-type":"application/json" }
    }

    fetch(`/polls/${this.props.deletePollId}`, requestConfig)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      })

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
