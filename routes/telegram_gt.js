const axios = require('axios');
const text = require('body-parser/lib/types/text');
const { toString, saveAndUpdateFileToRemoteServer } = require('../common/fileDownloadUpload');
const getQuery = require('../templates/getQuery')
let telegram_url = "https://api.telegram.org/bot" + process.env.TELEGRAM_API_TOKEN + "/sendMessage";

module.exports = (app, chalk) => {
  app.post("/start_bot", function (req, res) {
    console.log("we are getting request ==>", req.body)
    console.log('====>End');
    const { message } = req.body;
    const { poll, location, contact, text } = message
    // let _text = message.text //message.text.toLowerCase().indexOf('/');

    if (message) {

      let data = undefined
      data = toString(text)
      data += `\npoll=>${toString(poll)}`
      data += `\nlocation=>${toString(location)}`
      data += `\ncontact=>${toString(contact)}`

      const params = {
        userId: message?.chat?.id,
        messageId: message.message_id,
        replyToMessage: message?.reply_to_message?.message_id || '',
        query: data || 'attachment',
        platform: 'telegram'
      }

      if (params.query == '/start') {
        sendMessage(telegram_url, message, "Welcome to genietalk bot", res);
        return
      }

      getQuery(params).then(response => {
        checkForAttachmentAndSaveUpdate(message)
        sendMessage(telegram_url, message, response.data.ans, res);
      }).catch(error => {
        console.log("I'm getting error => ", error)
        sendMessage(telegram_url, message, "Sorry no result", res);
      })


    } else res.end('ok')

  });
}

function sendMessage(url, message, reply, res) {
  axios.post(url,
    {
      chat_id: message.chat.id,
      text: reply
    }).then(response => {
      console.log("Message posted");
      res.end("ok");
    }).catch(error => {
      console.log("Message failed");
      console.log(error);
      res.end("failed")
    });
}

checkForAttachmentAndSaveUpdate = (senderId, documentId, { document, audio, voice, video_note, photo }) => {
    if(photo){
      photo.forEach(element => {
        requestFileFromTelegram(element?.file_id, senderId, documentId)
      });
    }
}

requestFileFromTelegram = (file_id, senderId, documentId) =>
  new Promise((resolve, reject) => {
    getFilePathTelegramApi(file_id).then(filePath => {
        saveAndUpdateFileToRemoteServer(
          `https://api.telegram.org/file/bot${process.env.TELEGRAM_API_TOKEN}/${filePath}`, 
          senderId,
          documentId)
    }).catch(err =>console.log("got an error", err))
  })

getFilePathTelegramApi = file_id => new Promise((resolve, reject) => {
  axios.get(`/bot${process.env.TELEGRAM_API_TOKEN}/getFile`,
    {
      baseURL: "https://api.telegram.org",
      params: {
        file_id: file_id
      }
    })
    .then(response => {
      if (response.ok) {
        const filePath = response.result.file_path
        resolve(filePath)
      } else reject({ errorCode: 404, errorMsg: "Unable to resolve file path" })
    })
    .catch(error => {
      reject(error)
    })
})