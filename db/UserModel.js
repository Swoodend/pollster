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

//to include charts this should looks liek

/*
USER
username: ""
password: ""
email: ""
polls: [
  {
    id: ""
    title: ""
    options: ["kirk", "picard"] (these are the options you can vote on)
    votes: [12, 4] (these are the results for each option)
    voters: [username, anotherusername] (so you can only vote once)
  }
]

*/

let User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
