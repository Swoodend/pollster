import React, { Component } from 'react';

export default class DashboardPollDisplay extends Component {

  componentWillMount(){
    console.log('pollinfo in nested one', this.props.pollInfo);
    console.log(this.props.pollInfo.options[0]);
  }
  render(){
    return (
      <div>
        <h1>{this.props.pollInfo.title}</h1>
        <p>{this.props.pollInfo.id}</p>
        <p>author: {this.props.pollInfo.author}</p>
        <p>options:{this.props.pollInfo.options[0]} {this.props.pollInfo.options[1]}</p>
      </div>
    );
  }
}
