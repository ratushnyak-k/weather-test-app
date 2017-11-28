var serverFactory = require('spa-server');

var server = serverFactory.create({
  path: './build',
  port: process.env.PORT || 3000,
  fallback: 'index.html'
});

server.start();