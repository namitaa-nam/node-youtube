'use strict'
const youtube = require('youtube-node');
const Logging = require('js-logging');

var youTube = new youtube();
var logger = new Logging();
//set an api key for youtube api
youTube.setKey("AIzaSyDgexepnWUBo9Tw-aUvpP95aiJjeeorlyM");

exports.getVideoByName = function(key,callback){
	/*A function to get youtube video by name*/
	const channel = "UCPgfAA83ROUVM-E3NCY154A"
	const searchLimit = 3;
	youTube.search(key,searchLimit,{channelId: channel},function(error,result){
		/*If there is any error in the request return the respond 
		to be false else return respond to be true and send the data*/
		if(error){
			logger.info(error);
			callback({"res":false});
		}
		else{
			callback({"res":true,"data" : result["items"]});
		}
	})
	
}
