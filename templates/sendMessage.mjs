// const request = require('request')
import axios from 'axios'
export const sendMessage = (recipientId, message) =>{
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
        
        resolve(response)
        
      })
      .catch(function (error) {
        // handle error
        console.log("Error sending message ", error);
      //  console.log(error);
        reject(error)
      })
  })
}