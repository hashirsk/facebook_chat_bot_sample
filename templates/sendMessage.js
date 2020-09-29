// const request = require('request')
const axios = require('axios');
module.exports = function sendMessage(recipientId, message) {
  return new Promise(function(resolve, reject){

    axios.post(
      'https://graph.facebook.com/v8.0/me/messages',
      {
        recipient: {id: recipientId},
        message: message,
        messaging_type: "RESPONSE",
        notification_type: "REGULAR"
      },
      {
        params:{
          access_token: process.env.PAGE_ACCESS_TOKEN
        }
      }
    ).then(function (response) {
        // handle success
        resolve(response)
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("----------------");
        console.log(error);
        console.log("----------------");
        console.log("Error sending message ");
      //  console.log(error);
        reject(error)
      })

    // request({
    //   url: "https://graph.facebook.com/v8.0/me/messages",
    //   qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    //   method: "POST",
    //   json:{
    //     recipient: {id: recipientId},
    //     message: message,
    //     messaging_type: "RESPONSE",
    //     notification_type: "REGULAR"
    //   }
    // }, function (error, response, body){
    //   console.log(message);
    //   console.log("-------------------13------------------");
    //   if(error) {
    //     console.log("Error sending message "+response.error);
    //     reject(response.error)
    //   } else {
    //     resolve(body)
    //   }
    // })
  })
}
