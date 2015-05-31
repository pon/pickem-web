var Bluebird  = require('bluebird');
var Request   = Bluebird.promisify(require('request'));

exports.register = function (server, options, next) {

  var makeRequest = function (opts) {
    var requestOpts = {
      method: opts.method,
      url: 'http://localhost:3000' + opts.url,
      qs: opts.query || {},
      json: true,
      form: opts.form || {}
    };

    if (opts.token) {
      requestOpts.auth = {
        'bearer': opts.token
      };
    }

    return Request(requestOpts)
    .spread(function (res, body) {
      if (res.statusCode === 200) {
        return body;
      } else {
        throw body;
      }
    });
  };

  server.expose('makeRequest', makeRequest);
  next();
};

exports.register.attributes = {
  name: 'apiWrapper',
  version: '1.0.0'
};
