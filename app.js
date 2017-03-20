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
});

app.listen(process.env.PORT || 3001, () => {
  let port = process.env.PORT || 3001;
  console.log('app listening on port', port);
});
