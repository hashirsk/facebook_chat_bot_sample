const processPostback = require('../processes/postback')
const processMessage = require('../processes/messages')

module.exports = (app, chalk) => {

  // // Creates the endpoint for our webhook
  // app.post('/webhook', (req, res) => {
  //   let body = req.body;
  //   // Checks this is an event from a page subscription
  //   if (body.object === 'page') {
  //     // Iterates over each entry - there may be multiple if batched
  //     body.entry.forEach(function(entry) {
  //       // Gets the message. entry.messaging is an array, but
  //       // will only ever contain one message, so we get index 0
  //       let webhook_event = entry.messaging[0];
  //       console.log(webhook_event);
  //     });
  //
  //     // Returns a '200 OK' response to all requests
  //     res.status(200).send('EVENT_RECEIVED');
  //   } else {
  //     // Returns a '404 Not Found' if event is not from a page subscription
  //     res.sendStatus(404);
  //   }
  //
  // });


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
      if(req.body.object === 'page') {
        /* Iterate over each entry, there can be multiple entries
       if callbacks are batched. */
       req.body.entry.forEach((entry)=>{
         //Iterate over each messaging event
         entry.messaging.forEach((event)=>{
           console.log(event);
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
