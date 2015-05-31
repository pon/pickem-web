var Handlebars      = require('handlebars');
var Hapi            = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
  engines: {
    hbs: Handlebars
  },
  path: './views',
  layoutPath: './views/layouts',
  layout: 'defaultLayout',
  partialsPath: './views',
  helpersPath: './helpers'
});

server.register([
  { register: require('./services/apiWrapper') },
  { register: require('./services/authentication') },
  { register: require('./features/weeks') },
  { register: require('./services/public') }
], function (err) {
  if (err) throw err;
});

server.start(function () {
  console.log('Server running at ' + server.info.uri);
});
