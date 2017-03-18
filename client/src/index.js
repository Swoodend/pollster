import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


ReactDOM.render((
  <Router>
    <div>
      <Navbar/>
      <div style={{"margin-top":"55px", "margin-left": "20px"}}>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
      </div>
    </div>
  </Router>),
  document.getElementById('root')
);
