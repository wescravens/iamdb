'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  name: {type: String, unique: true},
  host: {type: ObjectId, ref: 'User'},
  players: [{type: ObjectId, ref: 'User', unique: true}],
  active: Boolean,
  history: [{
    player: {type: ObjectId, ref: 'User'},
    question: {
      subject: Number,
      isActor: Boolean
    },
    input: Number,
    valid: {type: Boolean, default: false},
    character: String
  }],
});

module.exports = mongoose.model('Game', GameSchema);
