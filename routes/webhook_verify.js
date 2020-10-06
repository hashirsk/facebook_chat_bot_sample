const processPostback = require('../processes/postback')
const processMessage = require('../processes/message')

module.exports = (app, chalk) => {

  app.get('/webhook', (req, res)=> {
    if(req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      res.status(200).send(req.query['hub.challenge'])
    } else {
      res.sendStatus(403)
    }
  })

  app.post('/webhook', (req, res) => {
      if(req.body.object === 'page') {
       req.body.entry.forEach((entry)=>{
         entry.messaging.forEach((event)=>{
           if(event.postback) {
             processPostback(event)
           } else if(event.message){
             processMessage(event, request.headers.host)
           }
         })
       })
       res.status(200).send('EVENT_RECEIVED');
      } else res.sendStatus(404);
  })
}
