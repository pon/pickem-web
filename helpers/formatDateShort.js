var Handlebars  = require('handlebars');
var moment      = require('moment');

module.exports =  function (context) {
  return new Handlebars.SafeString(
    moment(new Date(context)).format('YYYY-MM-DD')
  );
};

