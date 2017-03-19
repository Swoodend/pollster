import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {

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
    }
    return (
      <div className="signup-container">
        <div className="signup-box">
          <h1 style={styles.headerStyle}>Signup</h1>
          <form style={styles.fontStyle} className="signup-form">
            <div>
              <label style={styles.labelStyle}>Username:</label>
              <input style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Password:</label>
              <input style={styles.inputStyle} type="password" required="true"/>
            </div>
            <div>
              <label style={styles.labelStyle}>Confirm:</label>
              <input style={styles.inputStyle} type="password" required="true"/>
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
