import React, { Component } from 'react';

class FlashMessage extends Component {
  render(){
    return (
      <div className="flash-container">
        <h2>{this.props.type}</h2>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default FlashMessage;
