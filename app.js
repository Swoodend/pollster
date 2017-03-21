'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./db/UserModel').User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/pollster");

app.get('/', (req, res) => {
  res.send('hi mom');
});

app.post('/signup', (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10);

  let user = new User ({
    email: req.body.email,
    username: req.body.username,
    password: hash
  });

  user.save((err) => {
    if (!err){
      res.json({type: "OK"});
    } else {
      if (err.code === 11000){
        res.json({type: "Error", message:"Email/Username is already in use"});
      } else {
        res.json({type: "Error", message:"Something went wrong"})
      }
    }
  });
});

app.post('/login', (req, res) => {

  User.findOne({'username': req.body.username}, (err, user) => {
    if (err) {
      console.log('something went wrong');
      res.json({type:"Error", message:"Something went wrong"});
    }

    if (!err && user){
      if (bcrypt.compareSync(req.body.password, user.password)){
        res.json({type: "OK"});
      } else {
        res.json({type:"Error", message:"Incorrect password. Please try again"});
      }
    } else {
      res.json({type:"Error", message: "Username does not exist"});
    }
  })
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
