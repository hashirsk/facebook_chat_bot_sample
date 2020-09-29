// const request = require('request')
const axios = require('axios');
const senderAction = require('../templates/senderAction')
const sendMessage = require('../templates/sendMessage')

module.exports = function processPostback(event) {
  const senderID = event.sender.id
  const payload = event.sender.payload
  if(payload == 'Welcome') {

    axios.get(
      "https://graph.facebook.com/v8.0/" + senderID,
      {
        params:{
          access_token: process.env.PAGE_ACCESS_TOKEN,
          fields: "first_name"
        }
      }
    ).then(function (response) {
      console.log(response)

      let bodyObject = JSON.parse(response)
      console.log(bodyObject);
      name = bodyObject.first_name
      greeting = "Hello "+ name +"."

      let message = greeting + "Welcome to Sample Genietalk. Hope you are doing good today"
      let message2 = "You can ask some question :)"
      let message3 = "Please share some information"

      senderAction(senderID, "typing_on")
      sendMessage(senderID, {text: message}).then(()=>{
        sendMessage(senderID, {text: message2}).then(()=>{
          sendMessage(senderID, {text: message3}).then(()=>{
            sendMessage(senderID, {text: '🎈'})
            //senderAction(senderID, "typing_off")
          })
        })
      })

      })
      .catch(function (error) {
        // handle error
        console.log("Error getting user name : ");
      //  console.log(error);
      })
      .then(function () {
        // always executed
        console.log('finish');
      });

    // request({
    //   url: "https://graph.facebook.com/v8.0/" + senderID,
    //   qs: {access_token: process.env.PAGE_ACCESS_TOKEN, fields: "first_name"},
    //   method: "GET"
    // }, function (error, response, body) {
    //   let greeting = ''
    //   if(error) {
    //     console.log("Error getting user name : "+error);
    //   } else {
    //     let bodyObject = JSON.parse(body)
    //     console.log(bodyObject);
    //     name = bodyObject.first_name
    //     greeting = "Hello "+ name +"."
    //   }
    //
    //   let message = greeting + "Welcome to Sample Genietalk. Hope you are doing good today"
    //
    //   let message2 = "You can ask some question :)"
    //
    //   let message3 = "Please share some information"
    //
    //   senderAction(senderID, "typing_on")
    //   sendMessage(senderID, {text: message}).then(()=>{
    //     sendMessage(senderID, {text: message2}).then(()=>{
    //       sendMessage(senderID, {text: message3}).then(()=>{
    //         sendMessage(senderID, {text: '🎈'})
    //         //senderAction(senderID, "typing_off")
    //       })
    //     })
    //   })
    //
    // })
  }
}
