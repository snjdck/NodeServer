"use strict"

var config = require("./config/host");
var handlerMap = require("./config/handlerMap");

var TcpServer = require("net/TcpServer");
var TcpClient = require("net/TcpClient");
var Packet = require("net/Packet");

var socketServer = new TcpServer(__onSocketConnect);
socketServer.listen(config.socketPort, config.ip);

var clientList = [];

function __onSocketConnect(socket){
	var client = new TcpClient(new Packet(), socket);
	client.on("data", __onClientData);
	client.on("close", function(){
		realSock.removeAllListeners();
		realSock.end();
		console.log("client quit!~");
	});
	clientList.push(client);

	var realSock = new TcpClient(new Packet());
	realSock.connect("192.168.0.12", 7410);
	realSock.on("data", function(_, packet){
		client.send(packet.msgId, packet.body);
	});

	client.realSock = realSock;
}

function __onClientClose(client){
}

function __onClientData(client, packet){
	handlePacket(packet.msgId, client, packet);
	client.realSock.send(packet.msgId, packet.body);
}

function handlePacket(msgId, client, packet){
	var msgName = handlerMap[msgId];
	if(null == msgName){
		console.warn("unhandled msgId:", msgId);
		return;
	}
	var handler = require("./socket-services/" + msgName);
	handler.handle(client, packet);
}