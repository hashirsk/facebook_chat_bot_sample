const request = require('request')
module.exports = function senderAction(recipientId, typingStatus) {
  console.log("-------------------12.1------------------");
  console.log(recipientId);
  console.log("-------------------12.2------------------");
  console.log(typingStatus);
  console.log("-------------------12.3------------------");
  request({
    url: "https://graph.facebook.com/v8.0/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      sender_action: typingStatus
    }
  }, function (error, response, body) {
    console.log(body);
    console.log("-------------------12------------------");
    if(error) {
      console.log("Error sending message "+ response.error);
    }
  })
}
