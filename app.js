'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./db/UserModel').User;
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/pollster");

app.post('/polls/new', (req, res) => {
  //req.body.token
  //req.body.title
  //req.body.options
  //decoded.username
  jwt.verify(req.body.token, 'secret', (err, decoded) => {
    User.findOne({username: decoded.username}, (err, user) => {
      if (!err){
        //for every option, ie kirk or picard, the default num votes is 0
        let defaultVotes = req.body.options.map((option) => {
          return 0;
        });

        let pollInfo = {
          id: Math.random().toString(36).slice(2),
          author: decoded.username,
          title: req.body.title,
          options: req.body.options,
          votes: defaultVotes
        };
        user.polls.push(pollInfo);
        user.save((err) => {
          if (err){
            console.log('ERROR SAVING THE USERS POLL DATA');
          } else {
            res.json({
              status: "OK",
              pollId: pollInfo.id
            });
          }
        })
      } else {
        console.log('couldnt find that user');
      }
    })
  });
})

app.get('/validate/:token', (req, res) => {
  console.log('hit validate route');
  let token = req.params.token;
  console.log('token is', token);
  jwt.verify(token, 'secret', (err, decoded) => {
    if(!err && decoded){
      console.log('token validated sednding', decoded.username);
      res.json({user: decoded.username});
    } else {
      res.json({user: false});
    }
  });
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
      let token = jwt.sign({username: req.body.username, loggedIn: true}, 'secret');
      res.json({type: "OK", token: token});
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
        let token = jwt.sign({username: req.body.username, loggedIn: true}, 'secret');
        res.json({type: "OK", token: token});
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
