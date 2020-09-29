const request = require('request')
module.exports = function sendMessage(recipientId, message) {
  return new Promise(function(resolve, reject){
    request({
      url: "https://graph.facebook.com/v8.0/me/messages",
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: "POST",
      json:{
        recipient: {id: recipientId},
        message: message
      }
    }, function (error, response, body){
      console.log("-------------------13------------------");
      if(error) {
        console.log("Error sending message "+response.error);
        reject(response.error)
      } else {
        resolve(body)
      }
    })
  })
}
