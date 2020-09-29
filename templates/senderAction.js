// const request = require('request')
const axios = require('axios');
module.exports = function senderAction(recipientId, typingStatus) {

  axios.post(
    'https://graph.facebook.com/v8.0/me/messages',
    {
      recipient: {id: recipientId},
      sender_action: typingStatus
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
      console.log("Error sending message ");
    //  console.log(error);
    })

  // request({
  //   url: "https://graph.facebook.com/v8.0/me/messages",
  //   qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
  //   method: "POST",
  //   json: {
  //     recipient: {id: recipientId},
  //     sender_action: typingStatus
  //   }
  // }, function (error, response, body) {
  //   console.log(body);
  //   console.log("-------------------12------------------");
  //   if(error) {
  //     console.log("Error sending message "+ response.error);
  //   }
  // })
}
