const axios = require('axios');
const getQuery = require('./getQuery')
let telegram_url = "https://api.telegram.org/bot" + process.env.TELEGRAM_API_TOKEN +"/sendMessage";

module.exports = (app, chalk) => {
  app.post("/start_bot", function(req, res) {
      const { message } = req.body;
      let reply = "Welcome to telegram weather bot";
      // let _text = message.text //message.text.toLowerCase().indexOf('/');
      console.log(req);
      console.log("=====1=====");
      getQuery(message.chat.id, message.text).then((response) => {
        sendMessage(telegram_url,message,response.data.ans,res);
      }).catch((error)=>{
        sendMessage(telegram_url,message,"Sorry no result",res);
      })
    //   if(message.text.toLowerCase().indexOf("hi") !== -1){
    //       sendMessage(telegram_url,message,reply,res);
    //     }else if( (message.text.toLowerCase().indexOf("check") !== -1) && (city_check !== -1 ) ){
    //       city = message.text.split('/')[1];
    //       get_forecast(city).then( response =>{
    //         post_forecast(telegram_url,response,message,res)
    //       });
    // }else{
    //   reply = "request not understood, please review and try again.";
    //   sendMessage(telegram_url,message,reply,res);
    //   return res.end();`
    // }
  });
}

function sendMessage(url, message,reply,res){
  axios.post(url, {chat_id: message.chat.id,
    text: reply
  }).then(response => {
    console.log("Message posted");
    res.end("ok");
  }).catch(error =>{
    console.log(error);
  });
}
