import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {webhook_fb} from './routes/webhook_verify.js'
import {webhook_tg} from './routes/telegram_gt.js'
import {createLinkRouter as filedownload} from './routes/fileLink.route.js'

const app = express()

//app configuration
app.set('port', (process.env.PORT || 3000))

app.use(morgan('dev')); // log every request in console.log();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

webhook_fb(app)
webhook_tg(app)
app.use('file', filedownload)

app.listen(app.get('port'), function (){
  const url = 'http://localhost:'+app.set('port')
  console.log('Application is running on port: ', app.get('port'));
})
