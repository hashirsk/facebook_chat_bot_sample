// const request = require('request
import axios from 'axios'
//const senderAction = require('../templates/senderAction');

module.exports = function sendGenericTemplate(recipientId, respBody) {
  // console.log(respBody);
   const ans = respBody.ans;
   console.log("-------------------15------------------"+ans);


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
    
  }
