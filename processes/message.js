const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const sendGenericTemplate = require('../templates/sendGenericTemplate')

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
    // now we will take the text received and send it to an food tracking API.
      let text = message.text;
      let request = require("request");
      let options = {
          method: 'POST',
          url: 'https://damp-atoll-00850.herokuapp.com/query/getAnswers',
          // headers:{ 'cache-control': 'no-cache',
          //           'content-type': 'application/json'
          //         },
          body:{ userId: senderID,
                 query: text
               },
          json: true
      };
      console.log("-------------------7.5------------------");
      request(options, function (error, response, body) {
        console.log(response);
        console.log("------------");
        console.log(body);
        console.log("-------------------8------------------");
        console.log(error);
        if (error) {
          console.log("-------------------9------------------");
          console.log(error);
          throw new Error(error);
        }
        console.log("-------------------10------------------");
        senderAction(senderID);
        // after the response is recieved we will send the details in a Generic template
        console.log("-------------------11------------------");

        sendMessage(senderID, {
           text: ans,
           quick_replies: ["Welcome", "Hashir"]
        })
       //sendGenericTemplate(senderID,body)

     });
    }
  }
}
