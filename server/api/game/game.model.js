'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  name: {type: String, unique: true},
  players: [{type: ObjectId, ref: 'User'}],
  turn: String,
  rounds: Array,
  history: Array,
  active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);
