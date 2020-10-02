// const request = require('request');
const axios = require('axios');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const getQuery = require('../templates/getQuery')

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
    // now we will take the text received and send it to an food tracking API.
      let text = message.text;

      getQuery(senderID, text, 'facebook').then((response)=>{
        // console.log(response);
        console.log("------------121---------------"+response.data)
         senderAction(senderID, "typing_on");
         sendMessage(senderID, {
            text: response.data.ans
         }).then(()=>{
             senderAction(senderID, "typing_off");
           //senderAction(senderID, "typing_off")
         })
      }).catch((error)=>{

      })
    }
  }
}
