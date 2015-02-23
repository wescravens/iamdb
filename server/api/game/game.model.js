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
    subject: Number,
    input: Number,
    isActor: Boolean,
    isValid: {type: Boolean, default: false},
    character: String
  }],
  log: [{
    user: {type: ObjectId, ref: 'User'},
    message: String,
    timestamp: Date
  }]
});

GameSchema.plugin(require('mongoose-lifecycle'));

module.exports = mongoose.model('Game', GameSchema);
