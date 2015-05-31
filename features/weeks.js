exports.register = function (server, options, next) {

  var api = server.plugins.apiWrapper.makeRequest;

  server.route([{
    method: 'GET',
    path: '/weeks',
    config: {
      handler: function (request, reply) {
        return api({
          method: 'GET',
          url: '/weeks',
          token: request.auth.credentials.token
        })
        .then(function (weeks) {
          weeks = weeks.map(function (week) {
            week.open_date = new Date(week.open_date);
            week.close_date = new Date(week.close_date);
            return week;
          });
          return reply.view('weeks/index', {
            weeks: weeks
          });
        });
      }
    }
  }, {
    method: 'GET',
    path: '/weeks/new',
    config: {
      handler: function (request, reply) {
        return reply.view('weeks/new');
      }
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'weeks',
  version: '1.0.0'
};
