const request = require('request');

module.exports = function sendGenericTemplate(recipientId, respBody) {
   console.log(respBody);
   const ans = respBody.ans;
   console.log("-------------------15------------------");
  // for (let i = 0; i < respBody.length; i++) { // I dont like using forEach

      let obj = {
             "title":"Test Title",
             "image_url": "https://cdn130.picsart.com/316113773147201.png?type=webp&to=min&r=640",
             "subtitle": 'Subtitle',
           }

      let messageData = {
         "attachment": {
         "type": "template",
         "payload": {
               "template_type": "generic",
               "elements": [obj,obj]
            }
         }
      }

      request({
       url: 'https://graph.facebook.com/v8.0/me/messages',
       qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
       method: 'POST',
       json: {
         recipient: {id: recipientId},
         message: messageData
      }
    }, function(error, response, body){
      console.log(body);
      console.log("-----------16----------------")
         if (error) {
           console.log("Error sending message: " + response.error)
          }
     })
  }
