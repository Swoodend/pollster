import React, { Component } from 'react';

class Login extends Component {
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
