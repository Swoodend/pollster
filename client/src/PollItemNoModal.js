import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import DeletePollButton from './DeletePollButton'


export default class pollItemNoModal extends Component {
  constructor(props){
    super(props);

    this.setModalState = this.setModalState.bind(this);
  }

  setModalState(){
    this.props.displayModal();
  }

  render (){

    return (
        <div className="poll-item div-anchor" style={{"position":"relative"}}>
          <Link to={`polls/${this.props.id}`}>
            <div>
              <div className="pad-left poll-title">{this.props.title}</div>
              <div className="pad-left poll-votes">Total votes: {this.props.totalVotes}</div>
            </div>
          </Link>
          <DeletePollButton pollId={this.props.id} pollTitle={this.props.title} setModalState={this.props.displayModal}/>
        </div>
      )
  }
}
