// const request = require('request');
const axios = require('axios');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const getQuery = require('../templates/getQuery')

module.exports = function processMessage(event) {
  if (!event.message.is_echo) {
    const message = event.message;
    const attachment = message.attachments
    
    if (attachment) {
      attachment.forEach((element, idx) => {
        console.log('data => ', idx, element);
        console.log(element);
      });
    }
    if (message == undefined) {
      let text = "Welcome";

      getQuery(senderID, text, 'facebook').then((response) => {
        senderAction(senderID, "typing_on");
        sendMessage(senderID, {
          text: response.data.ans
        }).then(() => {
          senderAction(senderID, "typing_off");
        })
      }).catch((error) => {

      })
      return
    }
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      // now we will take the text received and send it to an food tracking API.
      let text = message.text;

      getQuery(senderID, text, 'facebook').then((response) => {
        senderAction(senderID, "typing_on");
        sendMessage(senderID, {
          text: response.data.ans
        }).then(() => {
          senderAction(senderID, "typing_off");
        })
      }).catch((error) => {

      })
    }
  }
}
