// NODE.JS REQUIREMENTS

var util = require("util"),
    express = require("express"),
    app = express(),
    http = require("http"),
	io = require("socket.io"),
	Patient = require("./Patient").Patient,
    repo = require('./repository');


// APP VARIABLES
var socket;	// Socket controller
var patients;

// APP INITIALISATION
function init() {
	patients = [];

	server=http.createServer(app); //crea el server
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(server); //permite usar websocket

	app.get('/',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	app.get('/gpsClient.html',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	app.get('/Patient.js',function(req,res){
		res.sendFile(__dirname +  '/Patient.js');	  
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
	socket.on("new patient", onNewPatient);

};

// New socket connection
function onSocketConnection(client) {
	console.log("New Patient has connected: ");

	// Listen for new player message
	client.on("new patient", onNewPatient);

};

// New player has joined
function onNewPatient(data) {
	// Create a new player
	var patient = new Patient(data.name, data.lastName, data.lat, data.lng, data.polygon.toString(), data.OK);

	console.log(patient.getName());
	console.log(patient.getLastName());

	console.log("onNewPatient");
		
	// Add new player to the players array
	patients.push(patient);

	//insert on the database
	repo.openDB();
	repo.insertPatient(patient);
	repo.close();

	patients.push(patient);
};


 
// RUN THE GAME
init();
