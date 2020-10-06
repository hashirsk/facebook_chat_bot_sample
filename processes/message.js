// const request = require('request');
const axios = require('axios');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');
const getQuery = require('../templates/getQuery')
const fileUtils = require('../common/fileDownloadUpload')

module.exports = function processMessage(event, _hostAddress) {
  if (!event.message.is_echo) {
    const message = event.message;
    const attachment = message.attachments
    const senderID = event.sender.id;
  console.log('getting event=>', event)
    console.log('Here is message=>', message)
    
    if (message == undefined) {
      let text = "Welcome";

      getQuery(senderID, text, 'facebook').then((response) => {
        if (attachment) {
          saveAndUpdateAttachmentFromFacebook(senderID, response.data._id)
        }
        senderAction(senderID, "typing_on");
        sendMessage(senderID, {
          text: response.data.ans
        }).then(senderAction(senderID, "typing_off"))
      }).catch(error => console.log(error))
      return
    }
    
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      // now we will take the text received and send it to an food tracking API.
      let text = message.text;

      getQuery(senderID, text, 'facebook').then((response) => {
        if (attachment) {
          saveAndUpdateAttachmentFromFacebook(senderID, response.data._id)
        }
        senderAction(senderID, "typing_on");
        sendMessage(senderID, {
          text: response.data.ans
        }).then(senderAction(senderID, "typing_off"))
      }).catch(error => console.log(error))
    }
  }
}


saveAndUpdateAttachmentFromFacebook = (senderID, documentId) =>{
  attachment.forEach((element, idx) => {
    console.log('data => ', idx, element);
    const type = element.type
    const url = element.payload.url
    fileUtils.downloadFile(url, senderID)
    .then(response=>{
      console.log("receiveResponse after file download ", response);
      axios.put('/userhistory/updatelog', {
        id: documentId
      },
      {
        baseUrl: 'https://damp-atoll-00850.herokuapp.com'
      })
      .then(response=>console.log(response))
      .catch(error=>console.log(error))

    })
    .catch(err=>console.log("Unable to process url ", err)) 
  });
}
