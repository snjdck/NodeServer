"use strict";

var config = require("./config/host");
var HttpServer = require("net/HttpServer");
var url = require("url");

var httpServer = new HttpServer(__onHttpRequest);
httpServer.listen(config.httpPort, config.ip);

function __onHttpRequest(request, response, requestBody){
	var params = url.parse(request.url, true);
	var handler = null;
	try{
		handler = require("./http-services" + params.pathname);
	}catch(err){
		console.error(err);
		endWith404(response);
		return;
	}
	switch(request.method)
	{
		case "GET":
			if(handler.onGet){
				handler.onGet(response, params.query);
				return;
			}
			break;
		case "POST":
			if(handler.onPost){
				handler.onPost(response, params.query, requestBody);
				return;
			}
			break;
	}
	endWith404(response);
}

function endWith404(response){
	response.statusCode = 404;
	response.end();
}