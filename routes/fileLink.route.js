const express = require('express')
const app = express()

const createLinkRouter = express.Router()

const createLinkController = require('../controller/fileLink.controller')

createLinkRouter.route('/getFile/:userid/:ext/:filename').get(createLinkController.createFileLink)

module.exports = createLinkRouter