// NODE.JS REQUIREMENTS

var util = require("util"),
    express = require("express"),
    app = express(),
    http = require("http"),
    io = require("socket.io"),	
    repo = require('./repository');



// APP VARIABLES
var socket,	// Socket controller
    patients;	// Array of patients


// APP INITIALISATION
function init() {
	// Create an empty array to store players
	patients = [];

	server=http.createServer(app); //crea el server
	// Set up Socket.IO to listen on port 8000
	socket = io.listen(server); //permite usar websocket

	app.get('/',function(req,res){
		res.sendFile(__dirname +  '/index.html');	  
	});

	app.get('/js/patientView.js',function(req,res){
		res.sendFile(__dirname +  '/js/patientView.js');	  
	});

	server.listen(8000);


//VER SI SE USA
//	app.use(express.static(__dirname+"/public")); 

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
};

// New socket connection
function onSocketConnection(client) {

//	console.log("New superviser has connected: "+client.constructor.name);
	console.log("New superviser has connected: ");

	//get all the patients	
	onGetPatients();

	console.log(patients.length);
	//send to client the list of patients
	this.emit("show Patients", patients);

};


function onGetPatients() {
	repo.openDB();
	patients = repo.getPatients();
	console.log(patients.length);
	repo.close();
	return patients; 
};


// GAME HELPER FUNCTIONS



// RUN THE GAME
init();
