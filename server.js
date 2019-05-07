const express = require('express')
const router = require('./routes/')
const path = require('path')
const ejs = require('ejs')
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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)

mongoose.connect(DB_URL)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('DB Offline'))

app.use('/api/v1/', router)

app.listen(process.env.PORT || port, () => {
    console.log('running at localhost:' + port)
})

module.exports = app
