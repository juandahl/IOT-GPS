// NODE.JS REQUIREMENTS

var util = require("util"),
    express = require("express"),
    app = express(),
    http = require("http"),
    io = require("socket.io"),	
    repo = require('./repository');


// APP VARIABLES
var socket;	// Socket controller


// APP INITIALISATION
function init() {
	server=http.createServer(app); //crea el server
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(server); //permite usar websocket

	app.get('/',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	app.get('/gpsClient.html',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	server.listen(5000);


	// Start listening for events
	setEventHandlers(); //fonction magic
	console.log("server of GPS started");
};


// GAME EVENT HANDLERS
var setEventHandlers = function() {
	// Socket.IO
	//funcion callback es llamada cada vez que un cliente se conecta
	socket.on("connection", onSocketConnection);
	//add a new Patient
	socket.on("add Patients", addPatient);

};

// New socket connection
function onSocketConnection(client) {

	console.log("New Patient has connected: ");

};

function addPatient(patient) {
	console.log(patient);
	patients.push(patient);
	repo.insertPatient(patient);
}

 
// RUN THE GAME
init();
