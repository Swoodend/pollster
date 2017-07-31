import React, { Component } from 'react';

export default class PollStatsArea extends Component {
  render(){
    let title = this.props.mostPopularPoll ? this.props.mostPopularPoll.title : null;

    return (
      <div className="poll-stats-container">
        <div id="most-popular-chart" className="poll-stats-subcontainer">
          <h2>{title}</h2>
        </div>

        <div className="poll-stats-subcontainer">
          <h2>Total Votes Across All Polls</h2>
        </div>

      </div>
    )
  }
}
