const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 2000

var app = express();
var publicPath = path.resolve(__dirname, 'client');	//to use the css styles
var serv = require("http").Server(app);
app.use(express.static(publicPath));
app.get("/", function(req, res){
	res.sendFile(__dirname + "client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

serv.listen(PORT); // Local host port
console.log("Starting Server..."); // When the server is started


var SOCKET_LIST = {}; 
var Personas = 0;
var io = require("socket.io")(serv,{});
io.sockets.on("connection", function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	socket.on("disconnect", function(){
		delete SOCKET_LIST[socket.id];
		Personas = Personas - 1;
	});

	socket.on("GetPersonas", function(){
		Personas = Personas + 1;
		for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit("CantidadPersonas", Personas);
		};
	});
});
