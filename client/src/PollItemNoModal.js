import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import DeletePollButton from './DeletePollButton'


export default class pollItemNoModal extends Component {
  render (){
    return (
      <div key={this.props.index} style={{position:"relative"}}>
        <Link to={`polls/${this.props.id}`}>
          <div className="poll-item div-anchor">
            <div className="poll-title">{this.props.title}</div>
            <div className="poll-votes">Total votes: {this.props.totalVotes}</div>
          </div>
        </Link>
        <DeletePollButton pollId={this.props.id} pollTitle={this.props.title} setModalState={this.props.displayModal}/>
      </div>
    )
  }
}
