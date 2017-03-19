import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render(){
    let styles = {
      headerStyle: {
        "color":"deepskyblue",
        "margin-left":"35px"
      },

      inputStyle: {
        "margin": "0 0 25px 5px",
        "outline": "none",
        "border-style": "none",
        "border-bottom": "1px solid black",
        "padding-left": "5px"
      },

      fontStyle: {
        "font-family": "Asap, Arial"
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
          <form style={styles.fontStyle} className="login-form">
            <div>
              <label style={styles.labelStyle}>Username:</label>
              <input style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Password:</label>
              <input style={styles.inputStyle} type="password" required="true"/>
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
