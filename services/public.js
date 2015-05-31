exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'public'
};
