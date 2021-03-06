// NODE.JS REQUIREMENTS

var util = require("util"),
    express = require("express"),
    app = express(),
    http = require("http"),
	io = require("socket.io"),
    repo = require('./repository');

// APP VARIABLES
var socket,	// Socket controller
    patients,	// Array of patients
 	server;


// APP INITIALISATION
function init() {
	patients = [];

	server=http.createServer(app); //crea el server
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(server); //permite usar websocket

	app.get('/',function(req,res){
		res.sendFile(__dirname +  '/index.html');	  
	});

	app.get('/index.html',function(req,res){
		res.sendFile(__dirname +  '/index.html');	  
	});

	app.get('/js/patientView.js',function(req,res){
		res.sendFile(__dirname +  '/js/patientView.js');	  
	});

	//port
	server.listen(8000);

	// Start listening for events
	setEventHandlers(); //fonction magic
	console.log("server of monitoring started");

};


// GAME EVENT HANDLERS
var setEventHandlers = function() {
	// Socket.IO
	//funcion callback es llamada cada vez que un cliente se conecta
	socket.on("connection", onSocketConnection);
	// Listen for a request message
	socket.on("getPatients", onGetPatients);
	socket.on("add Patients", addPatient);

};

// New socket connection
function onSocketConnection(client) {

	console.log("New superviser has connected: ");

	//get all the patients	
	patients = onGetPatients();
};

function addPatient(patient) {
	console.log(patient);
	patients.push(patient);
	socket.emit("show Patients", patients);
};


function onGetPatients() {
	patients = [];
	var promise1 = repo.getPatients();

	promise1.then(function(result) {
		patients = result;
		//send to client the list of patients
		socket.emit("show Patients", patients);
	});
};

// RUN THE SERVER
init();
