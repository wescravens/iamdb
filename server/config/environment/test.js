'use strict';

// Test specific configuration
// ===========================
var DB_HOST = process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost';
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + DB_HOST + '/iamdb-test'
  }
};
