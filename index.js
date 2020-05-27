global.log = (...aa) => aa.forEach(a => console.log(require('util').inspect(a, {showHidden: false, depth: null})))

if (process.argv.some(arg => arg === 'prod')) process.env.ENV_PROD = true

const path = require('path')
const PORTS = [8080, 80]
const bodyParser = require('body-parser')

const express = require('express')
const https = require('https')
const fs = require('fs')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
if (process.env.ENV_PROD) PORTS.forEach(PORT => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
})
else {
  require('dotenv-flow').config()
  const KEY_PATH = process.env.KEY_PATH
  const CERT_PATH = process.env.CERT_PATH
  const config = KEY_PATH && CERT_PATH ? {
    key: fs.readFileSync(KEY_PATH),
    cert: fs.readFileSync(CERT_PATH)
  } : {}
  https.createServer(config, app).listen(443, () => console.log(`Listening on ${443}`))
}

require('./routes/index.routes')(app)