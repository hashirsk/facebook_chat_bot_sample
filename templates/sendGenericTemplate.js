// const request = require('request
const axios = require('axios');
//const senderAction = require('../templates/senderAction');

module.exports = function sendGenericTemplate(recipientId, respBody) {
   console.log(respBody);
   const ans = respBody.ans;
   console.log("-------------------15------------------"+ans);
  // for (let i = 0; i < respBody.length; i++) { // I dont like using forEach

      // let obj = {
      //        "title":"Test Title",
      //        "image_url": "https://cdn130.picsart.com/316113773147201.png?type=webp&to=min&r=640",
      //        "subtitle": 'Subtitle',
      //      }

      // "attachment": {
      // "type": "template",
      // "payload": {
      //       "template_type": "generic",
      //       "elements": [obj,obj]
      //    }
      // }

      let messageData = {
         text: ans,
         quick_replies: ["Welcome", "Hashir"]
      }

      axios.post(
        'https://graph.facebook.com/v8.0/me/messages',
        {
          messaging_type: "RESPONSE",
          recipient: {id: recipientId},
          message: messageData,
          notification_type: "REGULAR"
        },
        {
          params:{
            access_token: process.env.PAGE_ACCESS_TOKEN
          }
        }
      ).then(function (response) {
          // handle success
        //  console.log(response);
        })
        .catch(function (error) {
          // handle error
        //  console.log(error);
        })
    //   request({
    //    url: 'https://graph.facebook.com/v8.0/me/messages',
    //    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    //    method: 'POST',
    //    json: {
    //      messaging_type: "RESPONSE",
    //      recipient: {id: recipientId},
    //      message: messageData,
    //      notification_type: "REGULAR"
    //   },
    //   {
    //     params:{
    //
    //     }
    //   }
    // }, function(error, response, body){
    //   console.log(body);
    // //  senderAction(senderID, "typing_off")
    //   console.log("-----------16----------------")
    //      if (error) {
    //        console.log("Error sending message: " + response.error)
    //       }
    //  })
  }
