import  { senderAction } from '../templates/senderAction.mjs'
import  { sendMessage } from '../templates/sendMessage.mjs'
import  { getQuery } from '../templates/getQuery.mjs'
import {saveAndUpdateFileToRemoteServer} from '../common/fileDownloadUpload.mjs'

export const processMessage = (event, _hostAddress) =>{
  if (!event.message.is_echo) {
    const message = event.message;
    const attachment = message.attachments
    const senderID = event.sender.id;

    const params = {
      userId: senderID,
      messageId: message.mid,
      replyToMessage: message?.reply_to?.mid ?? '',
      query: message.text ?? 'attachment',
      platform: 'facebook'
    }

    if (message == undefined || message == null) {
      
      getQuery(params).then((response) => {
        if (attachment) {
          saveAndUpdateAttachmentFromFacebook(attachment, senderID, response.data._id)
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

      getQuery(params).then((response) => {
        if (attachment) {
          saveAndUpdateAttachmentFromFacebook(attachment, senderID, response.data._id)
        }
        senderAction(senderID, "typing_on");
        sendMessage(senderID, {
          text: response.data.ans
        }).then(senderAction(senderID, "typing_off"))
      }).catch(error => console.log(error))
    }
  }
}


const saveAndUpdateAttachmentFromFacebook = (attachment, senderID, documentId) =>{
  attachment.forEach((element, idx) => {
    console.log('data => ', idx, element);
    const type = element.type
    const url = element.payload.url
    saveAndUpdateFileToRemoteServer(url, senderID, documentId, url)
  });
}