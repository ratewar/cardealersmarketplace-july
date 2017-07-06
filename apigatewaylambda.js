'use strict';
var qs = require('querystring');
var AWS = require('aws-sdk');
var isNumeric = require("isnumeric");
module.exports.acceptbid = (event, context, callback) => {
  var request = qs.parse(event.body);
  console.log(request.text);
  console.log(request.user_name);
  console.log(request.channel_name);
  console.log(request.user_id);
  var jsonString = JSON.stringify(request);
  console.log(jsonString);
  var bidtext = request.text;
  var array = bidtext.split(" ");
  if(array.length < 2 || array.length > 2)
  {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: '*There is issue with your bid: ' + request.text + '*'
      }),
    };
    callback(null, response);
  }
  else {
    for(var i=0;i<array.length;i++) {
        console.log('sdsddssdsddpart of request text : ' + array[i] + " and is it numeric : " + isNumeric(array[i]));
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Bid for The Car is:' + request['text'] + ' posted by user:' + request['user_name'] + ' in Channel:' + request['channel_name'],
      }),
    };
    callback(null, response);
  }
  //recordBid()
};
function recordBid(bidAmount, bidReference, dealerReference){
  var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "BidMaster";
    var params = {
        TableName:table,
        Item:{
            "bid_reference_number":bidReference,
            "dealer_id":dealerReference,
            "bid_amount":bidAmount
        }
    };
    console.log('adding a new item');
    docClient.put(params, function(err,data){
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          }
          else{
              console.log("item added");
              const response = {
                statusCode: 200,
                body: JSON.stringify({
                  message: 'Bid for The Car is:' + request['text'] + ' posted by user:' + request['user_name'] + ' in Channel:' + request['channel_name'],
                }),
              };
              callback(null, response);
          }
    });
}
