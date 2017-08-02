import React, { Component } from 'react';
import PollItemNoModal from './PollItemNoModal';
import DeletePollModal from './DeletePollModal';

export default class PollItem extends Component {
  constructor(props){
    super(props);

    this.displayModal = this.displayModal.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.deletePollItem = this.deletePollItem.bind(this);

    this.state = {
      displayingModal : false
    }
  }

  displayModal(){
    this.setState({ displayingModal : true});
  }

  switchModal(){
    this.setState({
      displayingModal : false
    });
  }

  deletePollItem(){
    this.setState({
      displayingModal : false
    }, () => {
      this.props.pollDeleted(this.props.id);
    })
  }

  render(){
    if(!this.state.displayingModal){
      return (
        <PollItemNoModal
          displayModal={this.displayModal}
          id={this.props.id}
          title={this.props.title}
          totalVotes={this.props.totalVotes}
        />
      )
    } else {
      //display the delete poll Option
      return (
        <DeletePollModal
          deletePollId={this.props.id}
          pollTitle={this.props.title}
          switchModal={this.switchModal}
          deletePollItem={this.deletePollItem}
        />
      )
    }
  }
}
