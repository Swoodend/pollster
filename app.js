'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('hi mom');
});

app.listen(process.env.PORT || 3001, () => {
  let port = process.env.PORT || 3001;
  console.log('app listening on port', port);
});
