'use strict';

const authorizer = require('./authorization');

module.exports.authorization = (event, context, callback) => {
  const code = event.queryStringParameters.code;
  console.log(code);
  authorizer(code).then(() =>{
      const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Authorisation was called',
            input: event,
          }),
      };
    callback(null, response);
  });

  


/*authorizer(code).then(() => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Authorisation was called',
            input: event,
          }),
      };
    callback(null, response);
  });*/
}
