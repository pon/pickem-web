exports.register = function (server, options, next) {

  var api = server.plugins.apiWrapper.makeRequest;

  server.route([{
    method: 'GET',
    path: '/logout',
    config: {
      handler: function (request, reply) {
        request.auth.session.clear();
        return reply.redirect('/login');
      }
    }
  }, {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: {
        view: 'authentication/login'
      }
    }
  }, {
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: function (request, reply) {
        return api({
          method: 'POST',
          url: '/tokens',
          form: request.payload
        })
        .bind({})
        .then(function (token) {
          this.token = token.token;
          return api({
            method: 'GET',
            url: '/users/current',
            token: token.token
          });
        })
        .then(function (user) {
          user.token = this.token;
          request.auth.session.set(user);
          return reply.redirect('/');
        })
        .catch(function (err) {
          reply.view('authentication/login', {
            error: err.message
          });
        });
      }
    }
  }]);

  server.register(require('hapi-auth-cookie'), function (err) {
    server.auth.strategy('session', 'cookie', true, {
      password: 'pickem',
      clearInvalid: true,
      redirectTo: '/login',
      isSecure: false
    });
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        return reply.view('index');
      }
    }
  });

  server.ext('onPreResponse', function (request, reply) {
    if (request.response.variety === 'view') {
      if (!request.response.source.context) {
        request.response.source.context = {};
      }

      if (request.auth.isAuthenticated) {
        request.response.source.context.currentUser = request.auth.credentials;
      }
    }

    reply.continue();
  });

  next();
};

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
};
