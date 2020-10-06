import express from 'express'
import { createFileLink } from '../controller/fileLink.controller.mjs'
const app = express()

export const createLinkRouter = express.Router()

createLinkRouter.route('/getfile/:userid/:ext/:filename').get(createFileLink)