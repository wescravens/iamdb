'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            process.env.DB_1_PORT_27017_TCP_ADDR ||
            'mongodb://localhost/iamdb'
  },

  redis: {
    host: process.env.REDIS_1_PORT_6379_TCP_ADDR || 'localhost',
    port: process.env.REDIS_1_PORT_6379_TCP_PORT || 'localhost'
  }
};
