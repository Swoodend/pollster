import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import NewPoll from './NewPoll';
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render((
  <Router>
    <div>
      <Navbar/>
      <div style={{"margin-top":"55px"}}>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/new" component={NewPoll}/>
      </div>
    </div>
  </Router>),
  document.getElementById('root')
);
