const processPostback = require('../processes/postback')
const processMessage = require('../processes/message')

module.exports = (app, chalk) => {

  app.get('/webhook', (req, res)=> {
    console.log(req);
    console.log("----------------------------");
    if(req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      console.log('webhook verified');
      console.log("-------------2---------------");
      res.status(200).send(req.query['hub.challenge'])
    } else {
      console.log("-------------3---------------");
      console.error('Verification failed. Token mismatched');
      res.sendStatus(403)
    }
  })
console.log("-------------4---------------");

  app.post('/webhook', (req, res) => {
    console.log("-------------5---------------");
    console.log(req);
    console.log("-------------5---------------");
      if(req.body.object === 'page') {
        /* Iterate over each entry, there can be multiple entries
       if callbacks are batched. */
       req.body.entry.forEach((entry)=>{
         console.log("-------------6---------------");
         console.log(entry);
         console.log("-------------6---------------");
         //Iterate over each messaging event
         entry.messaging.forEach((event)=>{
           console.log("-------------7---------------");
           console.log(event);
           console.log("-------------7---------------");
           if(event.postback) {
             processPostback(event)
           } else if(event.message){
             processMessage(event)
           }
         })
       })
       res.sendStatus(200).send('EVENT_RECEIVED');
      }
  })
}
