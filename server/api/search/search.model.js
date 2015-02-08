'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchSchema = new Schema({
  query: String
});

module.exports = mongoose.model('Search', SearchSchema);
