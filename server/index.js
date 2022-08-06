const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./endpoints')
const database = require('./database')

const app = express()
const PORT = 3000

database.init()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
