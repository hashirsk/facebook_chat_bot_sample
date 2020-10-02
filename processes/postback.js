// const request = require('request')
const axios = require('axios');
const senderAction = require('../templates/senderAction')
const sendMessage = require('../templates/sendMessage')

module.exports = function processPostback(event) {
  const senderID = event.sender.id
  const payload = event.sender.payload
  console.log("I am here");
  console.log(payload);
  if(payload === 'Welcome') {

    let message = "Hello, Welcome to Sample Genietalk. Hope you are doing good today"
    let message2 = "You can ask some question :)"
    let message3 = "Please share some information"

    senderAction(senderID, "typing_on")
    sendMessage(senderID, {text: message}).then(()=>{
      sendMessage(senderID, {text: message2}).then(()=>{
        sendMessage(senderID, {text: message3}).then(()=>{
          sendMessage(senderID, {text: '🎈'})
          //senderAction(senderID, "typing_off")
          console.log('sample');
        })
      })
    })

    // axios.get(
    //   "https://graph.facebook.com/v8.0/" + senderID,
    //   {
    //     params:{
    //       access_token: process.env.PAGE_ACCESS_TOKEN,
    //       fields: "first_name"
    //     }
    //   }
    // ).then(function (response) {
    //   console.log(response)

    //   let bodyObject = JSON.parse(response)
    //   console.log(bodyObject);
    //   name = bodyObject.first_name
    //   greeting = "Hello "+ name +"."

    //   let message = greeting + "Welcome to Sample Genietalk. Hope you are doing good today"
    //   let message2 = "You can ask some question :)"
    //   let message3 = "Please share some information"

    //   senderAction(senderID, "typing_on")
    //   sendMessage(senderID, {text: message}).then(()=>{
    //     sendMessage(senderID, {text: message2}).then(()=>{
    //       sendMessage(senderID, {text: message3}).then(()=>{
    //         sendMessage(senderID, {text: '🎈'})
    //         //senderAction(senderID, "typing_off")
    //       })
    //     })
    //   })

    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log("Error getting user name : ");
    //   //  console.log(error);
    //   })
  }
}
