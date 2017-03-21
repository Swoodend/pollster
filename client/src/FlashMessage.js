import React, { Component } from 'react';

class FlashMessage extends Component {
  render(){
    let componentClasses = ["flash-container"];

    if (this.props.fade){
      componentClasses.push("fade-out");
    }

    return (
      <div className={componentClasses.join(' ')}>
        <h2>{this.props.type}</h2>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default FlashMessage;
