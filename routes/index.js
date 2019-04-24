const express = require('express')
const app = express()

const Auth = require('./User/')
const Bubbue = require('./Bubbue/')
const Orders = require('./Order/')

app.use('/user', Auth)
app.use('/bubbue', Bubbue)
app.use('/orders', Orders)

module.exports = app
