'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose.connect("mongodb://localhost/pollster");

app.get('/', (req, res) => {
  res.send('hi mom');
});

app.post('/signup', (req, res) => {
  console.log('you posted to /signup');
  console.log(req.body.email, req.body.username, req.body.password, req.body.confirmPassword);
  res.send('ok');
  //this rotue will check if the email exits in the databse
  //if not it will create a new entry in the DB email, un, pass, email ver token, verified status
  //then send an verification email to the email provided with a link to localhost/:token
  //when the user hits THAT route find them and set verified to true
});

app.post('/login', (req, res) => {
  console.log('you posted to /login');
  console.log(req.body.username, req.body.password);
  res.send('sup');
  //this route will find the user by email, if the password is correct
  //and verified === true it will send a truthy value the browser
  //react will then redirect to /user/username/polls
  //if password is wrong it will send bad password to browser and
  //then react will display a flash message
  //if the email is not verified it will display a flash message
})

app.listen(process.env.PORT || 3001, () => {
  let port = process.env.PORT || 3001;
  console.log('app listening on port', port);
});
