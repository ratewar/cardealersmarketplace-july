'use strict';
var qs = require('querystring');
module.exports.acceptbid = (event, context, callback) => {
  var post = qs.parse(event.body);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Bid for The Car is:' + post['text'] + ' posted by user:' + post['user_name'] + ' in Channel:' + post['channel_name'],
    }),
  };
  callback(null, response);
};
