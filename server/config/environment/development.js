'use strict';

// Development specific configuration
// ==================================


module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost' + '/iamdb-dev'
  },

  seedDB: true,

  redis: {
    host: process.env.REDIS_1_PORT_6379_TCP_ADDR || 'localhost',
    port: process.env.REDIS_1_PORT_6379_TCP_PORT || 'localhost'
  }
};
