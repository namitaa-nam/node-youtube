'use strict'
exports.invalidKeywordList = function(req,res,callback){
	/*This function contains list of all the invalid 
	   keywords which admin wants to ban.You can add
	   more sections like hacking,movies,cartoons etc*/
	 var list = [
			'porn',
			'sex',
			'romance',
			'anal',
			'blowjob',
			'dick',
			'boobs',
			'tits',
			'hacking',
		]
		callback({"list":list});
}