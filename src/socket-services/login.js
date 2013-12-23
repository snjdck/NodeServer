"use strict"

var ByteArray = require("util/ByteArray");

exports.handle = function(client, packet){
	var bytes = new ByteArray(packet.body);
	var userName = bytes.readUTF();
	var password = bytes.readUTF();
	console.log("login, " + userName + ":" + password);
}