import React, { Component } from 'react';
import FlashMessage from './FlashMessage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Login extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFormFields = this.resetFormFields.bind(this);
    this.state = {
      error: null
    };
  }

  componentWillMount(){
     if (this.props.location.state){
       console.log(this.props.location.state);
       let errorType = this.props.location.state.type;
       let errorMessage = this.props.location.state.message;

       if (errorType && errorMessage){
         this.setState({
           error: {type: errorType, message: errorMessage}
         }, () => {
           window.setTimeout(() => {
             this.setState({
               error: null
             })
           }, 2000)
         });
       }
     }
   }

  resetFormFields(){
    this.refs.username.value = '';
    this.refs.password.value = '';
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
        return res.json()
      })
      .then((res) => {
        if (res.type === "OK"){
          //set token, clear form fields, send back to / (for now, redirect to dashboard once built)
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('currentUser', res.currentUser);
          localStorage.setItem('votedOn', JSON.stringify([]));
          this.resetFormFields();
          window.location.replace('http://localhost:3000/dashboard');
        } else {
          this.setState({
            error: {type: res.type, message: res.message}
          }, () => {
            window.setTimeout(() => {
              this.setState({
                error: null
              });
            }, 2000)
          });
          this.resetFormFields();
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
    let error = this.state.error ?
      <FlashMessage type={this.state.error.type} message={this.state.error.message}/> : null;
    return (
      <div>
        <ReactCSSTransitionGroup transitionName={"flash"} transitionEnterTimeout={0} transitionLeaveTimeout={1000}>
          {error}
        </ReactCSSTransitionGroup>
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
      </div>
    );
  }
}

export default Login;
