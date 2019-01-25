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
var server;

// APP INITIALISATION
function init() {
	patients = [];

	//crea el server
	server=http.createServer(app); 
	
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(server); //permite usar websocket

	//returns html code to render the website
	app.get('/',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	app.get('/gpsClient.html',function(req,res){
		res.sendFile(__dirname +  '/gpsClient.html');	  
	});

	app.get('/Patient.js',function(req,res){
		res.sendFile(__dirname +  '/Patient.js');	  
	});

	//port
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

// New patient has joined
function onNewPatient(data) {
	// Create a new patient
	var patient = new Patient(data.name, data.lastName, data.lat, data.lng, data.polygon, data.OK);

	console.log("onNewPatient");
		
	// Add new player to the patients array
	patients.push(patient);

	//insert on the database
	repo.openDB();
	repo.insertPatient(patient);
	repo.close();

};


 
// RUN THE SERVER
init();
