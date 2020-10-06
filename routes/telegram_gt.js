const axios = require('axios');
const getQuery = require('../templates/getQuery')
let telegram_url = "https://api.telegram.org/bot" + process.env.TELEGRAM_API_TOKEN +"/sendMessage";

module.exports = (app, chalk) => {
  app.post("/start_bot", function(req, res) {
    console.log("we are getting request ==>", req.body)
    console.log('====>End');
      const { message, poll, document, audio, location, contact, voice, video_note, photo } = req.body;
      let reply = "Welcome to telegram weather bot";
      // let _text = message.text //message.text.toLowerCase().indexOf('/');
      
      if(message) {
        if(message.text.toLowerCase() === '/start') {
          sendMessage(telegram_url, reply, reply, res);
          return
        }  

        getQuery(message.chat.id, message.text, 'telegram').then((response) => {
          checkForAttachmentAndSaveUpdate(req.body.message)
          sendMessage(telegram_url,message,response.data.ans,res);
        }).catch((error)=>{
          sendMessage(telegram_url,message,"Sorry no result",res);
        })
      } else res.end('ok')
    
  });
}

checkForAttachmentAndSaveUpdate = (body) =>{
  
}

function sendMessage(url, message,reply,res){
  axios.post(url, 
    {
      chat_id: message.chat.id,
      text: reply
    }).then(response => {
      console.log("Message posted");
      res.end("ok");
    }).catch(error =>{
      console.log("Message failed");
      console.log(error);
   });
}


requestFileFromTelegram = file_id => 
    new Promise((resolve, reject)=>{
        getFilePathTelegramApi(file_id).then( filePath =>{
            
        }).catch(err => {

        })
    })

    getFilePathTelegramApi = file_id => new Promise((resolve, reject)=>{
      axios.get(`/bot${process.env.TELEGRAM_API_TOKEN}/getFile`, 
        {
            baseURL: "https://api.telegram.org",
            params: {
                file_id: file_id
            }
        })
        .then(response => {
            if(response.ok){
                const filePath = response.result.file_path
                resolve(filePath)
            } else reject({errorCode: 404, errorMsg: "Unable to resolve file path"})
        })
        .catch(error => {
            reject(error)
        })
    })

    getFileStreamTelegramApi = file_path => new Promise((resolve, reject)=>{

    })