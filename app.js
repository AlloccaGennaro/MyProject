// call the packages we need
var express = require('express');
var connect = require('connect');
var morgan  = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/config.js');
var app = express();
var port = process.env.PORT || 8080;        // set our port
var cookieParser = require('cookie-parser');

//Connect to DB
mongoose.connect(config.database);

// set up our express application
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes
require('./routes/routes.js')(app);

// START THE SERVER
var server = app.listen(port, function () {
    console.log("MyProject server listening on port " + port);
});