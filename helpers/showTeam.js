var Handlebars = require('handlebars');

module.exports =  function (options) {
  return new Handlebars.SafeString(
    '<span style="font-weight: bold;"><img style="height: 20px;" alt="' + options.name + '" src="https://s3.amazonaws.com/pickemapi/' + options.id + '.png"/> ' + options.name + '</span>'
  );
};

