global.log = (...aa) => aa.forEach(a => console.log(require('util').inspect(a, {showHidden: false, depth: null})))


const path = require('path')
const PORTS = process.env.ENV_PROD ? [8080, 80] : [4598]
const bodyParser = require('body-parser')

const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
PORTS.forEach(PORT => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
})

require('./routes/index.routes')(app)