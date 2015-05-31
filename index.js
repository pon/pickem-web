var Handlebars      = require('handlebars');
var HandlebarsIntl  = require('handlebars-intl');
var Hapi            = require('hapi');

HandlebarsIntl.registerWith(Handlebars);

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
  engines: {
    hbs: Handlebars
  },
  path: './views',
  layoutPath: './views/layouts',
  layout: 'defaultLayout',
  partialsPath: './views'
});

server.register([
  { register: require('./services/apiWrapper') },
  { register: require('./services/authentication') },
  { register: require('./features/weeks') }
], function (err) {
  if (err) throw err;
});

server.start(function () {
  console.log('Server running at ' + server.info.uri);
});
