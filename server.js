var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var urlencoded_body_parser = bodyParser.urlencoded({
    extended: true
});
var port = 3000;

// yoyoyoyo
app.use(bodyParser.json());
app.use(urlencoded_body_parser);

const dbUrl = "mongodb://tushh:brainbox@ds016298.mlab.com:16298/bubbue";
mongoose.connect(dbUrl)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('DB Offline'))

app.use('/', router);

app.listen(process.env.PORT || port, () => {
    console.log('running at localhost:' + port);
})

module.exports = app;
