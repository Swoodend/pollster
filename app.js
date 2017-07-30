'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./db/UserModel').User;
const Poll = require('./db/PollModel').Poll;
const jwt = require('jsonwebtoken');
const gm = require("getmac");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/pollster");

/*this is the next route to fix. will facilitate voting on poll and ensure
users can only vote once by (use MAC address)*/
app.post('/polls/update/:pollId', (req, res) => {
  gm.getMac((err, macAddress) => {
    Poll.findOne({id: req.params.pollId}, (err, poll) => {
      if (err) return console.log('something went wrong in /polls/update/:pollId', err);
      //if we have not received a vote from that machine yet
      if (poll.voters.indexOf(macAddress) === -1){
        poll.votes[req.body.index] += 1;
        poll.markModified('votes');
        poll.voters.push(macAddress);
        poll.save((err, updatedPoll) => {
          res.json(
            {
              status: "OK",
              updatedVotes: poll.votes
            }
          );
        })
      } else {
        //user already voted
        res.json(
          {
            status: "Already voted"
          }
        )
      }

    })
  })
});

app.get("/:user/polls", (req, res) => {
  let user = req.params.user;
  Poll.find({author: user}, (err, pollArr) => {
    if (err) return console.log('something went wrong in /:user/polls', err);
    console.log('in /user/polls');
    console.log(pollArr);
    let totalVotes = pollArr.reduce((total, pollObj) => {
      total += pollObj.votes.reduce((subTotal, nextVal) => {
        return subTotal + nextVal;
      })
      return total;
    }, 0)

    let mostPopularPoll = pollArr.reduce((mostPopular, nextPoll) => {
      let mostPopVotes = mostPopular.votes.reduce((a, b) => {return a + b;});
      let nextPollVotes = nextPoll.votes.reduce((a, b) => {return a + b;});

      return mostPopVotes > nextPollVotes ? mostPopular : nextPoll
    })
    console.log('mostpop is', mostPopularPoll)
    res.json(
      {
        status: "OK",
        polls: pollArr,
        totalVotes,
        mostPopularPoll
      }
    );
  });
});


app.post('/polls/new', (req, res) => {
  jwt.verify(req.body.token, 'secret', (err, decoded) => {
    let initialVoteState = req.body.options.map((option) => {
      return 0
    });

    let newPoll = new Poll (
      {
        id: Math.random().toString(36).slice(2),
        title: req.body.title,
        author: decoded.username,
        options: req.body.options,
        votes: initialVoteState
      }
    );

    newPoll.save((err) => {
      if (err) console.log('ERROR SAVING NEW POLL', err);
      res.json({
        status: "OK",
        pollId: newPoll.id
      });
    });
  });
});

app.get('/validate/:token', (req, res) => {
  console.log('hit validate route');
  let token = req.params.token;
  if (token){
    jwt.verify(token, 'secret', (err, decoded) => {
      if(!err && decoded){
        res.json({user: decoded.username});
      } else {
        res.json({user: false});
      }
    });
  } else {
    res.json({user: false});
  }
});

app.post('/signup', (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10);

  let user = new User ({
    email: req.body.email,
    username: req.body.username,
    password: hash,
    polls: []
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
      res.json({type:"Error", message:"Something went wrong"});
    }

    if (!err && user){
      if (bcrypt.compareSync(req.body.password, user.password)){
        let token = jwt.sign({username: req.body.username, loggedIn: true}, 'secret');
        res.json({type: "OK", token: token, currentUser: req.body.username});
      } else {
        res.json({type:"Error", message:"Incorrect password. Please try again"});
      }
    } else {
      res.json({type:"Error", message: "Username does not exist"});
    }
  });
});

app.get('/polls/random', (req, res) =>{
  Poll.count((err, count) => {
    if(count > 0){
      let randIndex = Math.floor(Math.random() * count);
      console.log('in polls/random');
      Poll.findOne().skip(randIndex).exec((err, doc) => {
        console.log('in skip block doc is', doc);
        res.json (
          {
            status: 'OK',
            id: doc.id
          }
        )
      })
    } else {
      res.json(
        {
          status: 'null'
        }
      )
    }
  })
})

app.get('/polls/:pollId', (req, res) => {
  Poll.find({id: req.params.pollId}, (err, poll) => {
    if (err) console.log('err in /polls/:pollId', err);
    res.json(
      {
        status: "OK",
        pollData:
          {
            author: poll[0].author,
            title: poll[0].title,
            options: poll[0].options,
            votes: poll[0].votes,
            id: poll[0].id
          }
      }
    );
  });
});

app.delete('/polls/:pollId', (req, res) => {
  Poll.remove({id: req.body.id}, (err) => {
    if (err) return console.log('something went wrong in delete', err);
    res.json({
      status: 'deleted'
    })
  })
});



app.listen(process.env.PORT || 3001, () => {
  let port = process.env.PORT || 3001;
  console.log('app listening on port', port);
});
