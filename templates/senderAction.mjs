// const request = require('request')
import axios from 'axios'
export const senderAction = (recipientId, typingStatus) =>{

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
}
