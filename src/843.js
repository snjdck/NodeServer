"use strict";

var config = require("./config/host");

var TcpServer = require("net/TcpServer");
var TcpClient = require("net/TcpClient");
var Packet = require("net/Packet843");

var socketServer = new TcpServer(__onSocketConnect);
socketServer.listen(843, config.ip);

function __onSocketConnect(socket){
	var client = new TcpClient(new Packet(), socket);
	client.on("data", __onClientData);
}

function __onClientData(client, packet){
	client.removeAllListeners();
	client.send();
	client.end();
}