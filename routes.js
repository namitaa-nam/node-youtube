/*This page consist of all the routes to the server*/
'use strict'
const lib = require('./lib/lib');
const video = require('./controller/video');
const fs = require('fs');
const accesslog = require('access-log');

var validSearchKey = function(req,res,next){
	/*This is a middleware function to check valid search */
	var keyWord = req.body.key;
	//load the list of invalid key and perform checking
	lib.invalidKeywordList(req,res,(found)=>{
		let list = found.list
		/*Basically here we are using brute force assuming 
		  the less data to be checked but in real time
		  there may be millions of data to check so we must
		  use trie data structure to check it*/
		  var flagToCheckValidation = 0
		for(var i=0;i<list.length;i++){
			if(keyWord.indexOf(list[i])!=-1){
				flagToCheckValidation = 1;
				let errorMessage = "Sorry can not complete your request as the content you want to search comes under restricted area!!!"
				req.flash('warning',errorMessage)
				res.redirect("/");
			}
		}
		if(flagToCheckValidation == 0)
			return next();
	})
}

function keepLog(req,res,next){
	/*This is a middleware function to store the access log in 
		access.log file */
	var format = 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"';
	accesslog(req, res, format, function(store) {
		  var date = new Date();
		  store = date + " " + store + "\n\n";
		  //write log in access.log file
		  fs.appendFileSync("access.log", store);
	});
	return next();
}

module.exports = function(app){
	app.get("/",keepLog,function(req,res){
		let pageInfo = {};
		pageInfo.warning = req.flash("warning");
		res.render("index",pageInfo)
	})

	app.post("/video/search",keepLog,validSearchKey,function(req,res){
		let keyWord = req.body.key;
		video.getVideoByName(keyWord,(found)=>{
			/*  Check if the response is true or not.If the response
				is false just return the error message else if true
				print the search result list*/
			if(found.res == false){
				let errorMessage = "Sorry no data found or quota limit exceed or api problem"
				req.flash('warning',errorMessage)
				res.redirect("/");
			}
			else{
				let pageInfo = {}
				pageInfo.result = found.data;
				res.render("searchResult",pageInfo); 
			}
		})

	})
}