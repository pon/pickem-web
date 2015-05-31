var Handlebars = require('handlebars');

module.exports =  function (context) {
  return new Handlebars.SafeString(context ? 'Yes' : 'No');
};

