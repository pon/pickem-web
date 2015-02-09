var Hapi    = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
  engines: {
    hbs: require('handlebars')
  },
  path: './views',
  layoutPath: './views/layouts',
  layout: 'defaultLayout',
  partialsPath: './views'
});

server.register([
  { register: require('./plugins/services/apiWrapper') },
  { register: require('./plugins/services/authentication') }
], function (err) {
  if (err) throw err;
});

server.start(function () {
  console.log('Server running at ' + server.info.uri);
});
