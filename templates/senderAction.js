const request = require('request')
module.exports = function senderAction(recipientId) {
  request({
    url: "https://graph.facebook.com/v8.0/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      sender_action: "typing_on"
    }
  }, function (error, response, body) {
    console.log("-------------------12------------------");
    if(error) {
      console.log("Error sending message "+ response.error);
    }
  })
}
