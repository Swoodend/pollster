import React, { Component } from 'react';

class Login extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let requestConfig = {
      method: "POST",
      body: JSON.stringify({
        username: this.refs.username.value,
        password: this.refs.password.value
      }),
      headers: { "Content-type":"application/json" }
    }

    fetch('/login', requestConfig)
      .then((res) => {
        if (res.ok){
          console.log('ajax is working fine');
          //redirect to /users/username/polls
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
        "paddingLeft": "5px",
        "width": "150px"
      },

      fontStyle: {
        "fontFamily": "Asap, Arial"
      },

      labelStyle: {
        "display":"inline-block",
        "width": "100px"
      }
    };

    return (
      <div className="login-container">
        <div className="login-box">
          <h1 style={styles.headerStyle}>Login</h1>
          <form onSubmit={this.handleSubmit} style={styles.fontStyle} className="login-form">
            <div>
              <label style={styles.labelStyle}>Username:</label>
              <input ref="username" style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Password:</label>
              <input ref="password" style={styles.inputStyle} type="password" required="true"/>
            </div>
            <div>
              <input id="login-submit" type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
