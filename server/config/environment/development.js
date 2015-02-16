'use strict';

// Development specific configuration
// ==================================

var MONGO_HOST = process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost';
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + MONGO_HOST + '/iamdb-dev'
  },

  seedDB: true,

  redis: {
    host: process.env.REDIS_1_PORT_6379_TCP_ADDR || 'localhost',
    port: process.env.REDIS_1_PORT_6379_TCP_PORT || 6379
  }
};
