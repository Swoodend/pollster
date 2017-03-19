import React, { Component } from 'react';

class Signup extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('you submitted the form');
    console.log(this.refs.username.value, this.refs.password.value, this.refs.confirmpassword.value);
    fetch("/signup", {method: "POST"})
      .then((res) => {
        if (res.ok){
          console.log(res);
        } else {
          throw new Error ('Something went wrong with your fetch');
        }
      })
  }

  render(){
    let styles = {
      headerStyle: {
        "color":"deepskyblue",
        "marginLeft":"35px"
      },

      inputStyle: {
        "margin": "0 0 25px 5px",
        "outline": "none",
        "borderStyle": "none",
        "borderBottom": "1px solid black",
        "paddingLeft": "5px"
      },

      fontStyle: {
        "fontFamily": "Asap, Arial"
      },

      labelStyle: {
        "display":"inline-block",
        "width": "100px"
      }
    }
    return (
      <div className="signup-container">
        <div className="signup-box">
          <h1 style={styles.headerStyle}>Signup</h1>
          <form onSubmit={this.handleSubmit} style={styles.fontStyle} className="signup-form">
            <div>
              <label style={styles.labelStyle}>Username:</label>
              <input ref="username" style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Password:</label>
              <input ref="password" style={styles.inputStyle} type="password" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Confirm:</label>
              <input ref="confirmpassword" style={styles.inputStyle} type="password" required="true"/>
            </div>
            <div>
              <input id="signup-submit" type="submit" value="Register"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
