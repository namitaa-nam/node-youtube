/*This is the entry page of the project which contains
all the loaded modules and server configuration*/
'use strict'

//list of all the loaded modules
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const Logging = require('js-logging');
const flash = require('connect-flash');
//The port on which the project will run
var port = 9000;

var app = express();
//configure session for using flash
app.use(session({ 
  secret: 'lololppapadhoclabadhoclab',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //secure:   true,
    maxAge:   24*60*60*1000 } 
}));
app.use(bodyParser());
app.use(flash());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
let logger = new Logging();

//load all the routes of projects
require('./routes.js')(app);
//start the server on the above entered port
app.listen(port,function(error){
	if(error){
		logger.info("There was an error in connecting!!Plzz try after some time")
	}
	else{
		logger.info("Server successfully started on port " + port);
	}
})
