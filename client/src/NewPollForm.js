import React, { Component } from 'react';

class NewPollForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('form submitted');
    //send the jwt
    //get usersname on backend with the jwt
    //save the chart title to db to that users polls
    //save the options to db, needs to be an array like values: [spock, kirk]
    //then redirect to /polls/view/:pollid
  }

  render(){
    let styles = {
      headerStyle: {
        "color":"deepskyblue",
        "marginLeft":"35px"
      },
      inputStyle: {
        "margin": "0 0 50px 5px",
        "outline": "none",
        "borderStyle": "none",
        "borderBottom": "1px solid black",
        "paddingLeft": "5px",
        "width": "150px",
      },
      labelStyle: {
        "display":"inline-block",
        "width": "100px"
      }
    };

    return (
      <div className="new-poll-container">
        <div className="new-poll-box">
          <h1 style={styles.headerStyle}>New Poll</h1>
          <form onSubmit={this.handleSubmit} style={styles.fontStyle} className="signup-form">
            <div>
              <label style={styles.labelStyle}>Title:</label>
              <input ref="title" style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Options:</label>
              <input ref="options"
                style={styles.inputStyle}
                type="text"
                required="true"
                placeholder="seperate by a single space"
              />
            </div>
            <div>
              <input id="signup-submit" type="submit" value="Create"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPollForm;
