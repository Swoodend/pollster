'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pollSchema = new Schema ({
  id: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  author: {type: String, required: true},
  voters: {type: Array, default: []},
  options: {type: Array, default: []},
  votes: {type: Array, default: []}
});

let Poll = mongoose.model('Poll', pollSchema);

module.exports = {
  Poll : Poll
};
