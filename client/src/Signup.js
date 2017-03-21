import React, { Component } from 'react';
import FlashMessage from './FlashMessage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Signup extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormFields = this.clearFormFields.bind(this);
    this.state = {
      error: null
    }
  }

  clearFormFields(){
    this.refs.email.value = '';
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.confirmPassword.value = '';
  }

  handleSubmit(e){
    e.preventDefault();
    let requestConfig = {
      method: "POST",
      body: JSON.stringify({
        email: this.refs.email.value,
        username: this.refs.username.value,
        password: this.refs.password.value,
        confirmPassword: this.refs.confirmPassword.value
      }),
      headers: { "Content-type":"application/json" }
    }
    //if password === confirmPassword
    if (this.refs.password.value === this.refs.confirmPassword.value){
      fetch("/signup", requestConfig)
        .then((res) => {
            return res.json();
        }).then((res) => {
          if (res.type !== "OK"){
            this.setState({
              error: {type: res.type, message: res.message}
            }, () => {
              window.setTimeout(() => {
                this.setState({
                  error: null
                });
              }, 2000)
            });
            this.clearFormFields();
          }
        })
    } else {
      this.setState({
        error: {type: "Error", message: "Passwords did not match"}
      }, () => {
        window.setTimeout(() => {
          this.setState({
            error: null
          });
        }, 2000)
      });
      this.clearFormFields();
    }
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
    }

    let error = this.state.error ?
      <FlashMessage type={this.state.error.type} message={this.state.error.message}/> : null;
    return (
      <div>
        <ReactCSSTransitionGroup transitionName={"flash"} transitionEnterTimeout={0} transitionLeaveTimeout={1000}>
          {error}
        </ReactCSSTransitionGroup>
        <div className="signup-container">
          <div className="signup-box">
            <h1 style={styles.headerStyle}>Signup</h1>
            <form onSubmit={this.handleSubmit} style={styles.fontStyle} className="signup-form">
              <div>
                <label style={styles.labelStyle}>Email:</label>
                <input ref="email" style={styles.inputStyle} type="text" required="true"/>
              </div>
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
                <input ref="confirmPassword" style={styles.inputStyle} type="password" required="true"/>
              </div>
              <div>
                <input id="signup-submit" type="submit" value="Register"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
