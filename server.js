const express = require('express')
const router = require('./routes/')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const urlencoded_body_parser = bodyParser.urlencoded({
    extended: true
})
const port = 3000
const { DB_URL } = require('./config/constants')

app.use(bodyParser.json())
app.use(urlencoded_body_parser)

mongoose.connect(DB_URL)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('DB Offline'))

app.use('/api/v1/', router)

app.listen(process.env.PORT || port, () => {
    console.log('running at localhost:' + port)
})

module.exports = app
