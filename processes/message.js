// const request = require('request');
const axios = require('axios');
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
      // let request = require("request");
      // let options = {
      //     method: 'POST',
      //     url: 'https://damp-atoll-00850.herokuapp.com/query/getAnswers',
      //     // headers:{ 'cache-control': 'no-cache',
      //     //           'content-type': 'application/json'
      //     //         },
      //     body:{ userId: senderID,
      //            query: text
      //          },
      //     json: true
      // };
      // console.log("-------------------7.5------------------");


      axios.post(
        'https://damp-atoll-00850.herokuapp.com/query/getAnswers',
        {
          userId: senderID,
          query: text
        },
        {
          // params:{
          //   access_token: process.env.PAGE_ACCESS_TOKEN
          // }
        }
      ).then(function (response) {
          // handle success
         console.log(response);
         console.log("------------121---------------"+response.ans)
          senderAction(senderID, "typing_on");
          sendMessage(senderID, {
             text: response.ans
          }).then(()=>{
              senderAction(senderID, "typing_off");
            //senderAction(senderID, "typing_off")
          })
         //sendGenericTemplate(senderID,body)
        })
        .catch(function (error) {
          // handle error
        //  console.log(error);
        })

//       request(options, function (error, response, body) {
//         console.log(response);
//         console.log("------------");
//         console.log(body);
//         console.log("-------------------8------------------");
//         console.log(error);
//         if (error) {
//           console.log("-------------------9------------------");
//           console.log(error);
//           throw new Error(error);
//         }
//         console.log("-------------------10------------------");
//         senderAction(senderID, "typing_on");
//         // after the response is recieved we will send the details in a Generic template
//         console.log("-------------------11------------------");
// // quick_replies: ["Welcome", "Hashir"]
//         sendMessage(senderID, {
//            text: body.ans
//         }).then(()=>{
//             senderAction(senderID, "typing_off");
//           //senderAction(senderID, "typing_off")
//         })
//        //sendGenericTemplate(senderID,body)
//
//      });
    }
  }
}
