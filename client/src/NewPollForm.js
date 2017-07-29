import React, { Component } from 'react';

class NewPollForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let token = localStorage.getItem('jwt');
    let title = this.refs.title.value;
    let options = this.refs.options.value.split(' ');
    let reqConfig = {
      method: "POST",
      body: JSON.stringify({
        token,
        title,
        options
      }),
      headers: { "Content-type" : "application/json" }
    };

    fetch('/polls/new', reqConfig)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status === "OK"){
          window.location.replace(`http://localhost:3000/polls/${res.pollId}`);
        }
      });
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
                placeholder="option1 option2 option3"
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
