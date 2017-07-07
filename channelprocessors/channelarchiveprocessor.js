const request = require('request-promise');
module.exports.deleteChannels = (event, context, callback) => {
  var securityToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  var url = "https://slack.com/api/channels.list";
  var options = {
    method: "POST",
    uri: url,
    form : {
      token : securityToken,
      exclude_members: true
     },
    json: true,
  };
  request(options).then((response) => {
      console.log(response.ok);
      var url = "https://slack.com/api/channels.archive";
      for (var i = 0; i < response.channels.length; i++)
      {
          var channelId = response.channels[i].id;
          var options = {
              method: "POST",
              uri: url,
              form : {
                  token : securityToken,
                  channel: channelId
              },
              json: true,
          };
          request(options).then((response) => {
            console.log(`channel archieved ${channelId}`);
          }).catch(function(error){
            console.log('inside the catch block with error inviteDealers ' + error);
          });
      }
      console.log('let me call the call back now');
      callback(null,response);
  }).catch(function(error){
        console.log('inside the catch block with error Inside inviteDealers ' + error);
  });
};
