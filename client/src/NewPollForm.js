import React, { Component } from 'react';

class NewPollForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pollOptionInputs :['input0'],
      inputValues : {}
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let token = localStorage.getItem('jwt');
    let title = this.refs.title.value;
    let options = Object.keys(this.state.inputValues).map((key) => {
      return this.state.inputValues[key];
    });
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

  handleClick(e){
    e.preventDefault();
    let newPollOption = this.state.pollOptionInputs.slice();
    newPollOption.push(`input${this.state.pollOptionInputs.length}`);
    this.setState({
      pollOptionInputs : newPollOption
    });
  }

  handleChange(e){
    console.log('current val is', e.target.value);
    let newInputVal =  this.state.inputValues;
    newInputVal[e.target.name] = e.target.value;
    this.setState(
      {
        inputValues: newInputVal
      }, () => {
        console.log('new state is', this.state)
      }
    )
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
        "textAlign":"center"
      },
      labelStyle: {
        "display":"inline-block",
        "width": "100px"
      }
    };

    let optionInputs = this.state.pollOptionInputs.map((input, index, arr) => {
        if (index === arr.length -1){
          return  (
            <div key={index}>
              <input onChange={this.handleChange} name={`input${index}`} placeholder="Add an option" style={styles.inputStyle}/>
              <button onClick={this.handleClick}>Add option</button>
            </div>
          )
        } else {
          return (
            <div key={index}>
              <input onChange={this.handleChange} name={`input${index}`} placeholder="Add an option" style={styles.inputStyle}/>
            </div>
          )
        }
    })

    return (

      <div className="new-poll-container">
        <div className="new-poll-box">
          <h1 style={styles.headerStyle}>New Poll</h1>
          <form onSubmit={this.handleSubmit} style={styles.fontStyle} className="signup-form">
            <div>
              <input placeholder="title" ref="title" style={styles.inputStyle} type="text" required="true"/>
            </div>
            <div>
              <div>
                {optionInputs}
              </div>
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
