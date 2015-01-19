'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  name: {type: String, unique: true},
  host: {type: ObjectId, ref: 'User'},
  players: [{type: ObjectId, ref: 'User', unique: true}],
  turn: {type: ObjectId, ref: 'User'},
  rounds: Array,
  history: Array,
  active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);
