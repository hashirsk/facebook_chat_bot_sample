import  { senderAction } from '../templates/senderAction.js'
import { sendMessage } from '../templates/sendMessage.js'

export const processPostback = event => {
  const senderID = event.sender.id
  const payload = event.postback.payload
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
  }
}
