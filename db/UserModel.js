'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  polls: {type: Array, default: []},
  votedOn: {type: Array, default: []}
});

let User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
