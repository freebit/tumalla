const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./middleware/cors')
const logger = require('./middleware/logger')
const chalk = require('chalk')
const https = require('https')
const fs = require('fs')
const path = require('path')


const DBClient = require('./dbClient.js')
const UserTable = require('./models/UserTable')
const serverErrorHandler = require('./middleware/ServerErrorHandler')
const httpErrorHandler = require('./middleware/404ErrorHandler')

const config = require('./config')
const initDb = require('./models')
const mountApi = require('./api')


const app = express()
const serverPort = process.env.PORT || config.port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.use(logger(':method :url'))
app.use(cors)

mountApi(app)

app.use(serverErrorHandler)
app.use(httpErrorHandler)



https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'cert/local-server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert/local-server.cert')),
  requestCert: false,
  rejectUnauthorized: false
}, app)
.listen(serverPort, async () => {
  await DBClient.init()
  await initDb()
  console.log(chalk.green(`Express web app is available at https://localhost:${serverPort}\n`))
})