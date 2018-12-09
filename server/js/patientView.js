// GAME VARIABLES
var patients,	// list of patients
    socket;	// Socket connection



// APP INITIALISATION
function init() {
	// Initialise socket connection
	socket = io.connect(this);

	// Initialise remote players array
	patients = [];

	// Start listening for events
	setEventHandlers();
};


// APP EVENT HANDLERS
var setEventHandlers = function() {
	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// New patient added
	socket.on("new patient", onNewPatient);

	// Player removed message received
	socket.on("remove patient", onRemovePatient);

	socket.on("show Patients", showPatients);
};



// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

};


function showPatients(patients) {
	console.log(patients[0].id + "\t" + patients[0].name + "\t" + patients[0].lat + "\t" + patients[0].lng + "\t" + patients[0].OK);
};


// New player
function onNewPatient(data) {
	console.log("New player connected: "+data.id);

	// Question : Initialise the new player

	//create new player and after add it to the list
	var newPlayer = (data.nom, data.x, data.y, data.dirAngle, data.id);
	remotePlayers.push(newPlayer);

};


// Remove player
function onRemovePatient(data) {
	// Question : remove a player
	//get player to be deleted
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: "+data.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

};

//DIAGRAMA DE SECUENCIA UML
//BASE DE DATOS
// NAME LAT LONG OK

