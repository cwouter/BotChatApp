/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';

// Setup server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

require('./config/express').default(app);
require('./routes').default(app, io);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
